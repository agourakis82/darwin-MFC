/**
 * INTERACTIVE CLINICAL DECISION TREES
 * =====================================
 *
 * Step-by-step clinical decision support with branching logic
 * Visual flowcharts, interactive pathways, and outcome tracking
 *
 * @example
 * ```tsx
 * import { DecisionTree } from './interactive-tree';
 *
 * <DecisionTree
 *   tree={chestPainTree}
 *   onComplete={handleOutcome}
 * />
 * ```
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  GitBranch,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ChevronLeft,
} from 'lucide-react';
import { Card } from '../../design-system/primitives/card';
import { Button } from '../../design-system/primitives/button';

// ============================================================================
// TYPES
// ============================================================================

export interface DecisionNode {
  id: string;
  type: 'question' | 'outcome' | 'action';
  content: string;
  options?: {
    label: string;
    nextNodeId: string;
    severity?: 'normal' | 'warning' | 'critical';
  }[];
  outcome?: {
    diagnosis: string;
    recommendations: string[];
    urgency: 'routine' | 'urgent' | 'emergency';
  };
}

export interface DecisionTreeData {
  id: string;
  title: string;
  description: string;
  startNodeId: string;
  nodes: Record<string, DecisionNode>;
}

interface DecisionTreeProps {
  tree: DecisionTreeData;
  onComplete?: (outcome: DecisionNode['outcome']) => void;
  className?: string;
}

// ============================================================================
// SAMPLE DECISION TREE: CHEST PAIN
// ============================================================================

export const chestPainTree: DecisionTreeData = {
  id: 'chest-pain',
  title: 'Chest Pain Evaluation',
  description: 'Systematic approach to chest pain assessment',
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start',
      type: 'question',
      content: 'Is the patient experiencing acute chest pain NOW?',
      options: [
        { label: 'Yes - Acute onset', nextNodeId: 'acute', severity: 'critical' },
        { label: 'No - Chronic/recurrent', nextNodeId: 'chronic' },
      ],
    },
    acute: {
      id: 'acute',
      type: 'question',
      content: 'Are any of these CRITICAL features present?',
      options: [
        {
          label: 'Severe pain, diaphoresis, dyspnea, radiation to arm/jaw',
          nextNodeId: 'stemi-risk',
          severity: 'critical',
        },
        { label: 'None of these features', nextNodeId: 'risk-stratify' },
      ],
    },
    'stemi-risk': {
      id: 'stemi-risk',
      type: 'outcome',
      content: 'HIGH RISK for Acute Coronary Syndrome',
      outcome: {
        diagnosis: 'Suspected STEMI/Acute Coronary Syndrome',
        recommendations: [
          'Call emergency services immediately',
          'Administer aspirin 162-325mg (if not contraindicated)',
          'Obtain 12-lead ECG within 10 minutes',
          'Activate cath lab if STEMI confirmed',
          'Monitor vitals continuously',
        ],
        urgency: 'emergency',
      },
    },
    'risk-stratify': {
      id: 'risk-stratify',
      type: 'question',
      content: 'Risk factors present?',
      options: [
        {
          label: 'Age >50, diabetes, hypertension, smoking, family history',
          nextNodeId: 'moderate-risk',
          severity: 'warning',
        },
        { label: 'No major risk factors', nextNodeId: 'low-risk' },
      ],
    },
    'moderate-risk': {
      id: 'moderate-risk',
      type: 'outcome',
      content: 'Moderate Risk - Further Evaluation Needed',
      outcome: {
        diagnosis: 'Atypical chest pain with cardiac risk factors',
        recommendations: [
          'Obtain ECG and cardiac enzymes (troponin)',
          'Consider observation unit admission',
          'Serial troponins at 0, 2-3, and 6 hours',
          'Stress testing or coronary CTA if enzymes negative',
          'Cardiology consultation',
        ],
        urgency: 'urgent',
      },
    },
    'low-risk': {
      id: 'low-risk',
      type: 'question',
      content: 'Character of pain?',
      options: [
        { label: 'Sharp, pleuritic, positional', nextNodeId: 'musculoskeletal' },
        { label: 'Burning, related to meals', nextNodeId: 'gerd' },
      ],
    },
    musculoskeletal: {
      id: 'musculoskeletal',
      type: 'outcome',
      content: 'Likely Musculoskeletal Origin',
      outcome: {
        diagnosis: 'Musculoskeletal chest pain',
        recommendations: [
          'Reassure patient',
          'NSAIDs for symptom relief',
          'Follow up if symptoms persist >2 weeks',
          'Return precautions for red flag symptoms',
        ],
        urgency: 'routine',
      },
    },
    gerd: {
      id: 'gerd',
      type: 'outcome',
      content: 'Likely GERD',
      outcome: {
        diagnosis: 'Gastroesophageal reflux disease',
        recommendations: [
          'Trial of PPI therapy',
          'Dietary modifications',
          'Elevate head of bed',
          'Consider GI referral if no improvement in 4-6 weeks',
        ],
        urgency: 'routine',
      },
    },
    chronic: {
      id: 'chronic',
      type: 'question',
      content: 'Stable or worsening symptoms?',
      options: [
        { label: 'Worsening pattern', nextNodeId: 'unstable', severity: 'warning' },
        { label: 'Stable pattern', nextNodeId: 'stable-eval' },
      ],
    },
    unstable: {
      id: 'unstable',
      type: 'outcome',
      content: 'Unstable Pattern - Urgent Evaluation',
      outcome: {
        diagnosis: 'Unstable angina possible',
        recommendations: [
          'ECG and cardiac biomarkers',
          'Cardiology consultation within 24 hours',
          'Consider admission for observation',
          'Avoid exertion until evaluated',
        ],
        urgency: 'urgent',
      },
    },
    'stable-eval': {
      id: 'stable-eval',
      type: 'outcome',
      content: 'Stable - Outpatient Workup',
      outcome: {
        diagnosis: 'Stable chest pain syndrome',
        recommendations: [
          'Schedule outpatient stress test',
          'ECG at next visit',
          'Optimize risk factor management',
          'Return precautions provided',
        ],
        urgency: 'routine',
      },
    },
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const DecisionTree: React.FC<DecisionTreeProps> = ({
  tree,
  onComplete,
  className,
}) => {
  const [currentNodeId, setCurrentNodeId] = useState(tree.startNodeId);
  const [history, setHistory] = useState<string[]>([tree.startNodeId]);

  const currentNode = tree.nodes[currentNodeId];

  const handleOptionSelect = (nextNodeId: string) => {
    setCurrentNodeId(nextNodeId);
    setHistory((prev) => [...prev, nextNodeId]);

    const nextNode = tree.nodes[nextNodeId];
    if (nextNode.type === 'outcome' && nextNode.outcome && onComplete) {
      onComplete(nextNode.outcome);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentNodeId(newHistory[newHistory.length - 1]);
    }
  };

  const handleReset = () => {
    setCurrentNodeId(tree.startNodeId);
    setHistory([tree.startNodeId]);
  };

  const urgencyStyles = {
    routine: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-500',
      text: 'text-green-900 dark:text-green-100',
      label: 'ROUTINE',
    },
    urgent: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-500',
      text: 'text-yellow-900 dark:text-yellow-100',
      label: 'URGENT',
    },
    emergency: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-500',
      text: 'text-red-900 dark:text-red-100',
      label: 'EMERGENCY',
    },
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <GitBranch className="w-6 h-6 text-brand-primary-600 dark:text-brand-primary-400" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {tree.title}
          </h2>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{tree.description}</p>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <span>Step {history.length}</span>
          <div className="flex-1 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${(history.length / Object.keys(tree.nodes).length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Decision Node */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNodeId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            {currentNode.type === 'question' && (
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  {currentNode.content}
                </h3>
                <div className="space-y-3">
                  {currentNode.options?.map((option, idx) => (
                    <Button
                      key={idx}
                      variant={option.severity === 'critical' ? 'critical' : option.severity === 'warning' ? 'outline' : 'default'}
                      onClick={() => handleOptionSelect(option.nextNodeId)}
                      className={cn(
                        'w-full justify-between group',
                        option.severity === 'critical' && 'bg-red-600 hover:bg-red-700',
                        option.severity === 'warning' && 'border-yellow-500 text-yellow-700 dark:text-yellow-300'
                      )}
                    >
                      <span>{option.label}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {currentNode.type === 'outcome' && currentNode.outcome && (
              <div>
                <div className={cn(
                  'p-4 rounded-lg border-2 mb-4',
                  urgencyStyles[currentNode.outcome.urgency].bg,
                  urgencyStyles[currentNode.outcome.urgency].border
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    {currentNode.outcome.urgency === 'emergency' ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    <span className={cn(
                      'text-xs font-bold px-2 py-0.5 rounded',
                      urgencyStyles[currentNode.outcome.urgency].text
                    )}>
                      {urgencyStyles[currentNode.outcome.urgency].label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {currentNode.outcome.diagnosis}
                  </h3>
                  <div>
                    <p className="text-sm font-semibold mb-2">Recommendations:</p>
                    <ul className="space-y-2">
                      {currentNode.outcome.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-brand-primary-600 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={history.length <= 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Start Over
        </Button>
      </div>
    </div>
  );
};
