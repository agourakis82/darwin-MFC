'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SmartRecommendations,
  DifferentialDiagnosisAssistant,
  DrugInteractionChecker,
  ClinicalDecisionSupport,
  type ClinicalDecision,
} from '@/app/components/intelligence';
import {
  useSmartRecommendations,
  useDifferentialDiagnosis,
  useDrugInteractions,
  useMedicalDensity,
} from '@/app/hooks';
import { DensityToggle } from '@/app/components/medical';

export function Phase2IntelligenceShowcase() {
  const { density, changeDensity } = useMedicalDensity('comfortable');

  // Smart Recommendations
  const smartRecs = useSmartRecommendations({
    currentDiagnosis: 'Hypertension',
    userSpecialty: 'Cardiology',
  });

  // Differential Diagnosis
  const differential = useDifferentialDiagnosis({
    symptoms: ['Chest pain', 'Dyspnea', 'Diaphoresis'],
    patientAge: 65,
    gender: 'M',
    riskFactors: ['Smoking', 'Diabetes'],
  });

  // Drug Interactions
  const drugCheck = useDrugInteractions({
    initialMedications: ['Warfarin', 'Aspirin', 'Lisinopril'],
  });

  // Clinical Decision Support
  const [decisions] = useState<ClinicalDecision[]>([
    {
      id: 'acs-protocol',
      level: 'critical',
      title: 'Acute Coronary Syndrome Protocol',
      description: 'High-risk presentation detected',
      evidence: 'Patient presents with 3/3 features of ACS: chest pain, dyspnea, diaphoresis. EKG shows ST elevation in anterior leads.',
      recommendation: 'Immediate cardiology consultation and cardiac catheterization. Loading dose of P2Y12 inhibitor recommended.',
      references: [
        'ESC Guidelines on Acute Coronary Syndromes (2020)',
        'STEMI Management Protocols',
      ],
      actions: [
        {
          label: 'Alert Cardiology',
          onClick: () => console.log('Cardiology alerted'),
        },
        {
          label: 'Start Protocol',
          onClick: () => console.log('Protocol started'),
        },
      ],
    },
    {
      id: 'drug-interaction-warning',
      level: 'warning',
      title: 'Drug Interaction Alert',
      description: 'Warfarin + Aspirin interaction detected',
      evidence: 'Patient on dual anticoagulation/antiplatelet therapy, increasing bleeding risk significantly.',
      recommendation: 'Reassess indication for dual therapy. Consider discontinuing one agent or close INR monitoring.',
      references: ['Antithrombotic Therapy Guidelines'],
    },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Phase 2: Intelligence Layer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          AI-powered clinical decision support, recommendations, and differential diagnosis tools
        </p>

        {/* Density Toggle */}
        <div className="mt-6">
          <DensityToggle value={density} onChange={changeDensity} />
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Smart Recommendations */}
          <motion.div variants={itemVariants}>
            <SmartRecommendations
              recommendations={smartRecs.recommendations}
              title="🔍 Smart Recommendations"
              maxDisplay={4}
              onDismiss={smartRecs.onDismiss}
              density={density}
            />
          </motion.div>

          {/* Clinical Decision Support */}
          <motion.div variants={itemVariants}>
            <ClinicalDecisionSupport
              decisions={decisions}
              context={{
                diagnosis: 'Acute Coronary Syndrome',
                medications: ['Warfarin', 'Aspirin', 'Lisinopril'],
                vitals: {
                  'HR': '98 bpm',
                  'BP': '140/90 mmHg',
                  'O2': '94%',
                },
              }}
              density={density}
            />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Differential Diagnosis */}
          <motion.div variants={itemVariants}>
            <DifferentialDiagnosisAssistant
              diagnosis={differential.differentials}
              symptoms={differential.symptoms}
              patientFactors={{
                Age: differential.patientAge ?? 'Not specified',
                Gender: differential.gender === 'M' ? 'Male' : differential.gender === 'F' ? 'Female' : 'Not specified',
                'Risk Factors': differential.riskFactors.join(', ') || 'None',
              }}
              onAddSymptom={differential.addSymptom}
              onRemoveSymptom={differential.removeSymptom}
              density={density}
            />
          </motion.div>

          {/* Drug Interaction Checker */}
          <motion.div variants={itemVariants}>
            <DrugInteractionChecker
              medications={drugCheck.medications}
              interactions={drugCheck.interactions}
              onAddMedication={drugCheck.addMedication}
              onRemoveMedication={drugCheck.removeMedication}
              density={density}
            />
          </motion.div>
        </div>
      </div>

      {/* Key Features Section */}
      <motion.section variants={itemVariants} className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🚀 Intelligence Layer Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: '💡',
              title: 'Smart Recommendations',
              description: 'AI-powered suggestions based on context, trending topics, and personalized preferences',
            },
            {
              icon: '🔬',
              title: 'Differential Diagnosis',
              description: 'Build differential diagnoses with AI support based on symptoms and patient factors',
            },
            {
              icon: '💊',
              title: 'Drug Interaction Checker',
              description: 'Real-time checking for dangerous drug-drug interactions with severity levels',
            },
            {
              icon: '🧠',
              title: 'Clinical Decision Support',
              description: 'Evidence-based recommendations with prioritized clinical decisions',
            },
            {
              icon: '📊',
              title: 'Context-Aware',
              description: 'All features respond to patient context, medications, and clinical presentation',
            },
            {
              icon: '⚡',
              title: 'Real-time Insights',
              description: 'Instant analysis and recommendations that evolve as you input patient data',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Architecture Diagram */}
      <motion.section variants={itemVariants} className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          📐 Architecture
        </h2>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
            {`Intelligence Layer (Phase 2)
├── Smart Recommendations
│   ├── Related Content
│   ├── Trending Topics
│   ├── Personalized Alerts
│   └── ML-based Scoring
│
├── Differential Diagnosis
│   ├── Symptom Analysis
│   ├── Probability Scoring
│   ├── Next Steps
│   └── Guideline References
│
├── Drug Interaction Checker
│   ├── Multi-drug Analysis
│   ├── Severity Classification
│   ├── Mechanism Explanation
│   └── Recommendations
│
└── Clinical Decision Support
    ├── Evidence-based Rules
    ├── Priority Scoring
    ├── Action Items
    └── Reference Management`}
          </pre>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default Phase2IntelligenceShowcase;
