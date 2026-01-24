'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Trophy, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GamificationHub } from '../Gamification/GamificationHub';
import { StudyDashboard } from '../Study/StudyDashboard';
import Flashcard from '../Study/Flashcard';
import { useGamificationStore } from '@/lib/store/gamificationStore';
import { useSpacedRepetition, type SpacedRepetitionCard } from '@/app/hooks/useSpacedRepetition';

/**
 * Phase 3: Engagement & Gamification Showcase
 *
 * Demonstrates:
 * - XP and Level System
 * - Badge Collection
 * - Daily Challenges
 * - Spaced Repetition Learning
 * - Study Dashboard & Analytics
 */
export function Phase3EngagementShowcase() {
  const gamificationStore = useGamificationStore();
  const [currentTab, setCurrentTab] = useState('overview');

  // Demo flashcards
  const demoCards: SpacedRepetitionCard[] = [
    {
      id: 'fc-1',
      front: 'What is the primary treatment for acute myocardial infarction?',
      back: 'Primary percutaneous coronary intervention (PCI) or fibrinolytic therapy. PCI is preferred if available within 120 minutes of symptom onset.',
      interval: 1,
      easeFactor: 2.5,
      repetitions: 0,
      nextReview: new Date(),
    },
    {
      id: 'fc-2',
      front: 'List the diagnostic criteria for Type 2 Diabetes',
      back: 'FPG ≥126 mg/dL, 2-hour plasma glucose ≥200 mg/dL during OGTT, A1C ≥6.5%, or symptoms with random glucose ≥200 mg/dL',
      interval: 1,
      easeFactor: 2.5,
      repetitions: 0,
      nextReview: new Date(),
    },
    {
      id: 'fc-3',
      front: 'What is the mechanism of action of ACE inhibitors?',
      back: 'ACE inhibitors block the conversion of angiotensin I to angiotensin II, reducing vasoconstriction and aldosterone secretion, thereby lowering blood pressure.',
      interval: 1,
      easeFactor: 2.5,
      repetitions: 0,
      nextReview: new Date(),
    },
  ];

  const flashcardSession = useSpacedRepetition(demoCards);
  const [showAnswer, setShowAnswer] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Zap className="w-4 h-4" /> },
    { id: 'study', label: 'Study', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'stats', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Phase 3: Engagement & Gamification
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Transform clinical learning into an engaging, rewarding experience
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-neutral-200 dark:border-neutral-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors whitespace-nowrap',
              currentTab === tab.id && 'text-neutral-900 dark:text-neutral-100 border-blue-500'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {currentTab === 'overview' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <GamificationHub showStats={true} />

          {/* Demo Info Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <InfoCard
              title="🎮 Gamification System"
              description="Earn XP for completing medical learning activities. Progress through 10 levels from Novice to Legend."
              items={[
                'Earn XP for quizzes, flashcard reviews, and case studies',
                'Unlock badges for achievements and milestones',
                'Maintain daily learning streaks',
                'Track progress with daily challenges',
              ]}
            />
            <InfoCard
              title="📚 Spaced Repetition"
              description="Uses SM-2 algorithm for optimal review scheduling based on recall difficulty."
              items={[
                'Adaptive review intervals based on mastery',
                'Quality-based difficulty scaling',
                'Personalized retention curves',
                'Science-backed learning methodology',
              ]}
            />
            <InfoCard
              title="🏆 Achievements & Badges"
              description="Collect over 15 unique badges across categories: Learning, Explorer, Academic, and Special."
              items={[
                'Rarity tiers: Common to Legendary',
                'Track progress toward badge milestones',
                'Display earned badges in profile',
                'Secret badges for special conditions',
              ]}
            />
            <InfoCard
              title="📊 Performance Analytics"
              description="Detailed insights into your learning patterns and effectiveness."
              items={[
                'Study time tracking and trends',
                'Quiz performance analysis',
                'Badge completion rate',
                'Topic mastery visualization',
              ]}
            />
          </motion.div>
        </motion.div>
      )}

      {currentTab === 'study' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6"
        >
          <StudyDashboard />
        </motion.div>
      )}

      {currentTab === 'flashcards' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 mt-6"
        >
          <motion.div variants={itemVariants} className="card-base p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Spaced Repetition Demo
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Card {flashcardSession.currentIndex + 1} of {flashcardSession.dueCards.length}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {flashcardSession.progressPercent}%
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    Session Progress
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${flashcardSession.progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Flashcard Component */}
          {flashcardSession.currentCard && (
            <motion.div variants={itemVariants} className="card-base p-8">
              <Flashcard
                front={flashcardSession.currentCard.front}
                back={flashcardSession.currentCard.back}
                showAnswer={showAnswer}
                onFlip={() => setShowAnswer(!showAnswer)}
                onResponse={(quality) => {
                  flashcardSession.recordResponse(quality);
                  setShowAnswer(false);
                  gamificationStore.addXP(10, 'flashcard_session', 'Flashcard review');
                }}
              />
            </motion.div>
          )}

          {/* Session Stats */}
          {flashcardSession.isSessionComplete && (
            <motion.div
              variants={itemVariants}
              className="card-base p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  Session Complete! 🎉
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <StatBox
                    label="Cards Reviewed"
                    value={flashcardSession.sessionStats.cardsReviewed}
                    color="green"
                  />
                  <StatBox
                    label="Correct Responses"
                    value={flashcardSession.sessionStats.correctResponses}
                    color="emerald"
                  />
                  <StatBox
                    label="Accuracy"
                    value={`${flashcardSession.sessionStats.accuracy}%`}
                    color="teal"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {currentTab === 'stats' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* XP Breakdown */}
            <motion.div variants={itemVariants} className="card-base p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                XP Breakdown
              </h3>
              <div className="space-y-3">
                {gamificationStore.xpHistory.slice(-5).reverse().map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {transaction.description || transaction.type}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                      +{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Flashcard Stats */}
            <motion.div variants={itemVariants} className="card-base p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Flashcard Mastery
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-600 dark:text-neutral-400">Cards Reviewed</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {flashcardSession.stats.reviewedCards} / {flashcardSession.stats.totalCards}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${flashcardSession.stats.totalCards > 0
                          ? (flashcardSession.stats.reviewedCards / flashcardSession.stats.totalCards) * 100
                          : 0
                        }%`
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    Ease Factor: {flashcardSession.stats.averageEase.toFixed(2)}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Higher ease factor = easier cards to recall. Average optimal: 2.5
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Learning Path */}
          <motion.div variants={itemVariants} className="card-base p-6">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Learning Journey
            </h3>
            <div className="space-y-3">
              {[
                { step: 1, label: 'Cardiovascular Module', status: 'completed' },
                { step: 2, label: 'Endocrinology Module', status: 'completed' },
                { step: 3, label: 'Respiratory Module', status: 'in_progress' },
                { step: 4, label: 'Gastrointestinal Module', status: 'locked' },
                { step: 5, label: 'Neurology Module', status: 'locked' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      item.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : item.status === 'in_progress'
                          ? 'bg-blue-500 text-white'
                          : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {item.status === 'completed' ? '✓' : item.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.label}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">
                      {item.status === 'completed' && 'Completed'}
                      {item.status === 'in_progress' && 'In Progress'}
                      {item.status === 'locked' && 'Locked'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

interface InfoCardProps {
  title: string;
  description: string;
  items: string[];
}

function InfoCard({ title, description, items }: InfoCardProps) {
  return (
    <div className="card-base p-6 space-y-3">
      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <span className="text-blue-500 font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string | number;
  color: string;
}

function StatBox({ label, value, color }: StatBoxProps) {
  const colorClasses = {
    green: 'text-green-700 dark:text-green-300',
    emerald: 'text-emerald-700 dark:text-emerald-300',
    teal: 'text-teal-700 dark:text-teal-300',
  } as Record<string, string>;

  return (
    <div className={`p-3 rounded-lg ${colorClasses[color] || ''}`}>
      <div className="text-xs opacity-75">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

export default Phase3EngagementShowcase;
