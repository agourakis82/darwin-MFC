'use client';

/**
 * NER Demo Page - Interactive Clinical Entity Recognition
 * =======================================================
 *
 * Combines all 4 AI components into an interactive demo:
 * - SOAPSectionParser: Parse SOAP sections from free text
 * - EntityHighlighter: Visualize extracted entities inline
 * - NERConfidenceIndicator: Display confidence scores
 * - EntityCorrectionModal: Collect user feedback
 *
 * Features:
 * - Mode switching: Regex, BioBERT, Hybrid
 * - Real-time entity extraction
 * - BioBERT model loading with progress
 * - Comparative analysis
 *
 * Phase 3 Month 7 - Week 3-4 Deliverable
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Cpu,
  Zap,
  Download,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  EntityHighlighter,
  EntityLegend,
  NERConfidenceIndicator,
  SourceBadge,
  SOAPSectionParser,
  EntityCorrectionModal,
  QuickFeedbackButtons,
  ClinicalAlertDisplay,
  type ParsedSOAP,
  type EntityCorrection,
  type CorrectionEntity,
  type FeedbackType,
} from '@/app/components/AI';
import { useNERExtraction, type ExtractionMode } from '@/lib/ai/hooks';
import type { ExtractedEntity } from '@/lib/ai/extraction/biobert-extractor';
import type { EntityType } from '@/lib/ai/models/onnx-config';

// =============================================================================
// SAMPLE SOAP NOTES FOR DEMO
// =============================================================================

const SAMPLE_NOTES: { id: string; title: string; titlePt: string; text: string }[] = [
  {
    id: 'diabetes',
    title: 'Diabetes Follow-up',
    titlePt: 'Acompanhamento de Diabetes',
    text: `S: Paciente diabético tipo 2 refere poliúria e polidipsia há 2 semanas. Nega hipoglicemia ou tonturas. Dieta irregular.
O: PA 140/90 mmHg. FC 78 bpm. Glicemia de jejum: 220 mg/dL. HbA1c 8.5%. IMC 29. Exame dos pés sem úlceras.
A: Diabetes mellitus tipo 2 descompensado. Hipertensão arterial. Sobrepeso.
P: Aumentar metformina para 850mg 2x ao dia. Iniciar losartana 50mg. Orientação nutricional. HbA1c em 3 meses.`,
  },
  {
    id: 'respiratory',
    title: 'Respiratory Infection',
    titlePt: 'Infecção Respiratória',
    text: `S: Paciente com tosse produtiva há 5 dias, febre até 38.5°C, dor torácica ventilatório-dependente. Nega dispneia em repouso.
O: Temperatura 37.8°C. FR 20 irpm. SatO2 96%. MV presente, crepitações em base direita. Rx tórax: infiltrado em lobo inferior direito.
A: Pneumonia adquirida na comunidade (PAC).
P: Amoxicilina-clavulânico 875/125mg 12/12h por 7 dias. Dipirona se febre. Repouso relativo. Retorno em 48h ou se piora.`,
  },
  {
    id: 'cardiac',
    title: 'Heart Failure',
    titlePt: 'Insuficiência Cardíaca',
    text: `S: Idoso 75 anos com ICC, refere dispneia aos médios esforços, edema de MMII progressivo. Ortopneia. Nega dor precordial.
O: PA 150/95 mmHg. FC 88 bpm, ritmo irregular. Estase jugular +. Estertores em bases pulmonares. Edema MMII +3/+4. BNP 650 pg/mL.
A: Insuficiência cardíaca congestiva descompensada NYHA III. Fibrilação atrial. Hipertensão.
P: Furosemida 40mg 2x ao dia. Ajustar carvedilol para 12.5mg 2x. Restrição hídrica 1.5L/dia. ECG. Ecocardiograma. Consulta cardio.`,
  },
  {
    id: 'pediatric',
    title: 'Pediatric Bronchiolitis',
    titlePt: 'Bronquiolite Pediátrica',
    text: `S: Lactente 8 meses com coriza há 3 dias, evoluindo com tosse e sibilância. Dificuldade para mamar. Sem febre hoje.
O: Temperatura 37.2°C. FC 140 bpm. FR 52 irpm. SatO2 93% AA. Tiragem subcostal leve. Sibilos expiratórios difusos.
A: Bronquiolite aguda viral (provável VSR).
P: Suporte ventilatório se necessário. Hidratação oral fracionada. Paracetamol 15mg/kg se febre. Sinais de alerta explicados. Retorno em 24h.`,
  },
  {
    id: 'mental',
    title: 'Depression Assessment',
    titlePt: 'Avaliação de Depressão',
    text: `S: Paciente 45 anos, humor deprimido há 2 meses, insônia terminal, fadiga, anedonia. Ideação passiva de morte, nega plano. PHQ-9: 18.
O: Vigil, orientado. Humor deprimido, afeto congruente. Psicomotricidade lentificada. Pensamento sem alterações formais.
A: Episódio depressivo maior moderado-grave. Risco de suicídio baixo-moderado.
P: Sertralina 50mg pela manhã. Encaminhar para psicoterapia. Retorno em 2 semanas. Orientações sobre sinais de alarme.`,
  },
];

// =============================================================================
// MODE CONFIGURATION
// =============================================================================

const MODE_CONFIG: Record<ExtractionMode, {
  icon: React.ElementType;
  label: string;
  labelPt: string;
  description: string;
  color: string;
}> = {
  regex: {
    icon: Cpu,
    label: 'Regex',
    labelPt: 'Regex',
    description: 'Fast pattern-based extraction',
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
  },
  biobert: {
    icon: Brain,
    label: 'BioBERT',
    labelPt: 'BioBERT',
    description: 'ML-based semantic extraction',
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
  },
  hybrid: {
    icon: Zap,
    label: 'Hybrid',
    labelPt: 'Híbrido',
    description: 'Combined for best accuracy',
    color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
  },
};

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function NERDemoPage() {
  const t = useTranslations('ai');

  // NER Extraction Hook
  const {
    entities,
    isLoading,
    mode,
    setMode,
    isModeAvailable,
    modelStatus,
    initializeBiobert,
    modelLoadingProgress,
    extract,
    result,
    metrics,
  } = useNERExtraction({
    initialMode: 'regex',
    minConfidence: 0.5,
  });

  // Local State
  const [inputText, setInputText] = useState(SAMPLE_NOTES[0].text);
  const [selectedSample, setSelectedSample] = useState(SAMPLE_NOTES[0].id);
  const [parsedSOAP, setParsedSOAP] = useState<ParsedSOAP | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<ExtractedEntity | null>(null);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [corrections, setCorrections] = useState<EntityCorrection[]>([]);
  const [highlightMode, setHighlightMode] = useState<'inline' | 'underline' | 'badge'>('inline');
  const [showConfidence, setShowConfidence] = useState(true);
  const [minConfidence, setMinConfidence] = useState(0.5);
  const [activeTab, setActiveTab] = useState<'input' | 'parsed' | 'entities'>('input');

  // Extract on text change
  useEffect(() => {
    if (inputText.trim()) {
      extract(inputText, { minConfidence });
    }
  }, [inputText, minConfidence, extract]);

  // Computed values from hook
  const entityStats = metrics?.byType ?? {};
  const avgConfidence = metrics?.avgConfidence ?? 0;

  // Handle sample selection
  const handleSampleSelect = useCallback((sampleId: string) => {
    const sample = SAMPLE_NOTES.find((s) => s.id === sampleId);
    if (sample) {
      setInputText(sample.text);
      setSelectedSample(sampleId);
      setParsedSOAP(null);
    }
  }, []);

  // Handle SOAP parsing
  const handleSOAPParsed = useCallback((soap: ParsedSOAP) => {
    setParsedSOAP(soap);
  }, []);

  // Handle entity click
  const handleEntityClick = useCallback((entity: ExtractedEntity) => {
    setSelectedEntity(entity);
  }, []);

  // Handle entity correction request
  const handleEntityCorrect = useCallback((entity: ExtractedEntity) => {
    setSelectedEntity(entity);
    setShowCorrectionModal(true);
  }, []);

  // Handle correction submission
  const handleCorrectionSubmit = useCallback((correction: EntityCorrection) => {
    setCorrections((prev) => [...prev, correction]);
    setShowCorrectionModal(false);
    setSelectedEntity(null);
  }, []);

  // Handle quick feedback for selected entity
  const handleQuickFeedback = useCallback((feedbackType: FeedbackType) => {
    if (!selectedEntity) return;

    const entityForCorrection: CorrectionEntity = {
      text: selectedEntity.text,
      type: selectedEntity.type,
      startChar: selectedEntity.startChar,
      endChar: selectedEntity.endChar,
      confidence: selectedEntity.confidence,
      source: selectedEntity.source,
    };

    const correction: EntityCorrection = {
      originalEntity: entityForCorrection,
      correctedEntity: feedbackType === 'correct' ? entityForCorrection : null,
      feedbackType,
      timestamp: new Date(),
      sessionId: 'demo-session',
    };
    setCorrections((prev) => [...prev, correction]);
  }, [selectedEntity]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          {t('nerDemo.title')}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {t('nerDemo.description')}
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Input & Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sample Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
          >
            <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              {t('nerDemo.sampleNotes')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_NOTES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleSelect(sample.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    selectedSample === sample.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }`}
                >
                  {sample.titlePt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-700">
            {(['input', 'parsed', 'entities'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                    : 'text-neutral-600 dark:text-neutral-400 border-transparent hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {t(`nerDemo.tabs.${tab}`)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
              >
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  {t('nerDemo.inputLabel')}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-64 px-3 py-2 text-sm font-mono bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder={t('nerDemo.inputPlaceholder')}
                />
              </motion.div>
            )}

            {activeTab === 'parsed' && (
              <motion.div
                key="parsed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
              >
                <SOAPSectionParser
                  text={inputText}
                  onSectionsChange={handleSOAPParsed}
                  editable={true}
                  showConfidence={true}
                  className="min-h-[300px]"
                />
              </motion.div>
            )}

            {activeTab === 'entities' && (
              <motion.div
                key="entities"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
              >
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  {/* Highlight Mode */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      {t('nerDemo.highlightMode')}:
                    </span>
                    <select
                      value={highlightMode}
                      onChange={(e) => setHighlightMode(e.target.value as typeof highlightMode)}
                      className="text-xs px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700"
                    >
                      <option value="inline">Inline</option>
                      <option value="underline">Underline</option>
                      <option value="badge">Badge</option>
                    </select>
                  </div>

                  {/* Confidence Toggle */}
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={showConfidence}
                      onChange={(e) => setShowConfidence(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {t('nerDemo.showConfidence')}
                    </span>
                  </label>

                  {/* Min Confidence */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                      {t('nerDemo.minConfidence')}:
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={minConfidence}
                      onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
                      className="w-20"
                    />
                    <span className="text-xs font-mono">{minConfidence.toFixed(1)}</span>
                  </div>
                </div>

                <EntityHighlighter
                  text={inputText}
                  entities={entities}
                  onEntityClick={handleEntityClick}
                  onEntityCorrect={handleEntityCorrect}
                  highlightMode={highlightMode}
                  showConfidence={showConfidence}
                  minConfidence={minConfidence}
                  showTooltips={true}
                  fontSize="md"
                  className="min-h-[200px] leading-relaxed"
                />

                {/* Entity Legend */}
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <EntityLegend compact />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column - Stats & Selected Entity */}
        <div className="space-y-6">
          {/* Mode Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
          >
            <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Extraction Mode
            </h2>
            <div className="space-y-2">
              {(Object.keys(MODE_CONFIG) as ExtractionMode[]).map((modeKey) => {
                const config = MODE_CONFIG[modeKey];
                const Icon = config.icon;
                const isAvailable = isModeAvailable(modeKey);
                const isSelected = mode === modeKey;

                return (
                  <button
                    key={modeKey}
                    onClick={() => isAvailable && setMode(modeKey)}
                    disabled={!isAvailable && modeKey !== 'regex'}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isSelected
                        ? `${config.color} ring-2 ring-offset-2 ring-offset-white dark:ring-offset-neutral-800 ${
                            modeKey === 'regex' ? 'ring-blue-500' :
                            modeKey === 'biobert' ? 'ring-purple-500' :
                            'ring-amber-500'
                          }`
                        : isAvailable
                        ? 'bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                        : 'bg-neutral-50 dark:bg-neutral-900 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? '' : 'text-neutral-500'}`} />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{config.label}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {config.description}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {!isAvailable && modeKey !== 'regex' && (
                      <span className="text-xs text-neutral-400">Not loaded</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* BioBERT Model Status */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  BioBERT Model
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  modelStatus.loaded
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : modelStatus.loading
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    : modelStatus.error
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'
                }`}>
                  {modelStatus.loaded ? 'Ready' :
                   modelStatus.loading ? 'Loading...' :
                   modelStatus.error ? 'Error' : 'Not Loaded'}
                </span>
              </div>

              {modelStatus.loading && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Loader2 className="w-3 h-3 animate-spin text-purple-500" />
                    <span className="text-xs text-neutral-500">
                      Loading model... {Math.round(modelLoadingProgress * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${modelLoadingProgress * 100}%` }}
                      className="h-full bg-purple-500 rounded-full"
                    />
                  </div>
                </div>
              )}

              {modelStatus.error && (
                <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 mb-3">
                  <AlertCircle className="w-3 h-3" />
                  <span>Failed to load model: {modelStatus.error}</span>
                </div>
              )}

              {(!modelStatus.loaded && !modelStatus.loading) && (
                <button
                  onClick={() => initializeBiobert()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Load BioBERT Model
                </button>
              )}

              {modelStatus.loaded && (
                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Model ready for inference</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Extraction Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
          >
            <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
              {t('nerDemo.extractionStats')}
            </h2>

            {/* Total Entities */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('nerDemo.totalEntities')}
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {entities.length}
              </span>
            </div>

            {/* Average Confidence */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t('nerDemo.avgConfidence')}
                </span>
                <NERConfidenceIndicator
                  confidence={avgConfidence}
                  source={result?.actualMode ?? mode}
                  mode="badge"
                  size="sm"
                />
              </div>
            </div>

            {/* By Type */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                {t('nerDemo.byType')}
              </span>
              {Object.entries(entityStats).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      type === 'DISEASE' ? 'bg-red-500' :
                      type === 'MEDICATION' ? 'bg-blue-500' :
                      type === 'SYMPTOM' ? 'bg-amber-500' :
                      type === 'EXAM' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`} />
                    {type}
                  </span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>

            {/* Source Badge */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t('nerDemo.extractionSource')}
                </span>
                <SourceBadge source={result?.actualMode ?? mode} size="sm" />
              </div>
              {isLoading && (
                <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Extracting entities...</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Clinical Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
          >
            <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              {t('clinicalAlerts.title')}
            </h2>
            <ClinicalAlertDisplay
              entities={entities}
              onEntityClick={handleEntityClick}
              compact
              maxAlerts={5}
            />
          </motion.div>

          {/* Selected Entity Details */}
          {selectedEntity && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
            >
              <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                {t('nerDemo.selectedEntity')}
              </h2>

              <div className="space-y-3">
                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-500 uppercase">
                    {t('nerDemo.entityText')}
                  </span>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {selectedEntity.text}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-500 uppercase">
                    {t('nerDemo.entityType')}
                  </span>
                  <p className="font-medium">{selectedEntity.type}</p>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-500 uppercase">
                    {t('nerDemo.confidence')}
                  </span>
                  <NERConfidenceIndicator
                    confidence={selectedEntity.confidence}
                    source={selectedEntity.source}
                    mode="bar"
                    size="md"
                    className="mt-1"
                  />
                </div>

                <div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-500 uppercase">
                    {t('nerDemo.position')}
                  </span>
                  <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                    [{selectedEntity.startChar}:{selectedEntity.endChar}]
                  </p>
                </div>

                {/* Quick Feedback */}
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs text-neutral-500 dark:text-neutral-500 uppercase mb-2 block">
                    {t('nerDemo.quickFeedback')}
                  </span>
                  <QuickFeedbackButtons
                    onFeedback={handleQuickFeedback}
                    compact
                  />
                </div>

                <button
                  onClick={() => setShowCorrectionModal(true)}
                  className="w-full mt-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {t('nerDemo.detailedCorrection')}
                </button>
              </div>
            </motion.div>
          )}

          {/* Corrections Summary */}
          {corrections.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4"
            >
              <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                {t('nerDemo.correctionsTitle')} ({corrections.length})
              </h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {corrections.slice(-5).map((c, i) => (
                  <div
                    key={i}
                    className="text-xs p-2 bg-neutral-50 dark:bg-neutral-900 rounded"
                  >
                    <span className="font-medium">{c.originalEntity?.text || 'N/A'}</span>
                    <span className="text-neutral-500 dark:text-neutral-500 mx-1">→</span>
                    <span className={`${
                      c.feedbackType === 'correct' ? 'text-green-600' :
                      c.feedbackType === 'incorrect_type' ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {c.feedbackType}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Correction Modal */}
      {showCorrectionModal && selectedEntity && (
        <EntityCorrectionModal
          isOpen={showCorrectionModal}
          onClose={() => {
            setShowCorrectionModal(false);
            setSelectedEntity(null);
          }}
          entity={{
            text: selectedEntity.text,
            type: selectedEntity.type,
            startChar: selectedEntity.startChar,
            endChar: selectedEntity.endChar,
            confidence: selectedEntity.confidence,
            source: selectedEntity.source,
          }}
          contextText={inputText}
          onSubmit={handleCorrectionSubmit}
          enableTextSelection={true}
        />
      )}
    </div>
  );
}
