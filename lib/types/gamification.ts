/**
 * Gamification Types
 * Badge system, XP tracking, achievements
 */

/**
 * Badge categories
 */
export type BadgeCategory =
  | 'learning'      // Complete paths, perfect quizzes, streaks
  | 'explorer'      // View diseases, medications, all categories
  | 'academic'      // Use citations, print PDFs, export data
  | 'contributor'   // Community contributions
  | 'special';      // Special achievements, milestones

/**
 * Badge rarity levels
 */
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

/**
 * Badge definition
 */
export interface Badge {
  id: string;
  name: string;
  nameKey: string; // i18n key
  description: string;
  descriptionKey: string; // i18n key
  icon: string; // Lucide icon name or emoji
  category: BadgeCategory;
  rarity: BadgeRarity;
  xpReward: number;
  criteria: BadgeCriteria;
  secret?: boolean; // Hidden until earned
}

/**
 * Badge earning criteria
 */
export interface BadgeCriteria {
  type: BadgeCriteriaType;
  target: number;
  condition?: string; // Additional conditions
}

export type BadgeCriteriaType =
  | 'streak_days'           // Consecutive days of activity
  | 'modules_completed'     // Total modules completed
  | 'paths_completed'       // Learning paths completed
  | 'perfect_quizzes'       // Quizzes with 100% score
  | 'diseases_viewed'       // Unique diseases viewed
  | 'medications_viewed'    // Unique medications viewed
  | 'protocols_viewed'      // Unique protocols viewed
  | 'categories_explored'   // All categories in a section explored
  | 'citations_viewed'      // Citations expanded/read
  | 'exports_completed'     // PDF/data exports
  | 'time_spent_minutes'    // Total time spent learning
  | 'quiz_attempts'         // Total quiz attempts
  | 'flashcards_reviewed'   // Flashcards reviewed
  | 'community_actions'     // Community interactions
  | 'custom';               // Custom criteria

/**
 * User's earned badge
 */
export interface EarnedBadge {
  badgeId: string;
  earnedAt: string; // ISO date
  progress?: number; // Progress percentage when earned (for display)
}

/**
 * Badge progress tracking
 */
export interface BadgeProgress {
  badgeId: string;
  currentValue: number;
  targetValue: number;
  percentage: number;
  lastUpdated: string;
}

/**
 * XP transaction types
 */
export type XPTransactionType =
  | 'module_complete'
  | 'path_complete'
  | 'quiz_pass'
  | 'perfect_quiz'
  | 'badge_earned'
  | 'streak_bonus'
  | 'daily_login'
  | 'flashcard_session'
  | 'community_action';

/**
 * XP transaction record
 */
export interface XPTransaction {
  id: string;
  type: XPTransactionType;
  amount: number;
  timestamp: string;
  description?: string;
  relatedId?: string; // Related module/path/badge ID
}

/**
 * User level based on XP
 */
export interface UserLevel {
  level: number;
  title: string;
  titleKey: string; // i18n key
  minXP: number;
  maxXP: number;
  icon: string;
}

/**
 * Achievement notification
 */
export interface AchievementNotification {
  id: string;
  type: 'badge' | 'level_up' | 'streak' | 'milestone';
  title: string;
  description: string;
  icon: string;
  xpEarned?: number;
  timestamp: string;
  dismissed: boolean;
}

/**
 * Daily challenge
 */
export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD
  type: 'quiz' | 'flashcard' | 'reading' | 'mixed';
  title: string;
  titleKey: string;
  description: string;
  descriptionKey: string;
  xpReward: number;
  target: number;
  progress: number;
  completed: boolean;
  expiresAt: string;
}

/**
 * Gamification statistics
 */
export interface GamificationStats {
  totalXP: number;
  currentLevel: number;
  badgesEarned: number;
  longestStreak: number;
  currentStreak: number;
  totalTimeMinutes: number;
  quizzesCompleted: number;
  perfectQuizzes: number;
  modulesCompleted: number;
  pathsCompleted: number;
}

/**
 * Leaderboard entry
 */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  badgeCount: number;
  isCurrentUser?: boolean;
}

/**
 * Gamification state for Zustand store
 */
export interface GamificationState {
  // XP and levels
  totalXP: number;
  currentLevel: number;
  xpHistory: XPTransaction[];
  
  // Badges
  earnedBadges: EarnedBadge[];
  badgeProgress: Record<string, BadgeProgress>;
  
  // Streaks
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  
  // Daily challenges
  dailyChallenges: DailyChallenge[];
  
  // Notifications
  pendingNotifications: AchievementNotification[];
  
  // Statistics
  stats: {
    diseasesViewed: string[];
    medicationsViewed: string[];
    protocolsViewed: string[];
    citationsViewed: number;
    exportsCompleted: number;
    quizzesCompleted: number;
    perfectQuizzes: number;
    flashcardsReviewed: number;
  };
}

// =============================================================================
// BADGE DEFINITIONS
// =============================================================================

export const BADGES: Badge[] = [
  // Learning badges
  {
    id: 'first_steps',
    name: 'First Steps',
    nameKey: 'gamification.badges.first_steps.name',
    description: 'Complete your first learning module',
    descriptionKey: 'gamification.badges.first_steps.description',
    icon: '👣',
    category: 'learning',
    rarity: 'common',
    xpReward: 50,
    criteria: { type: 'modules_completed', target: 1 },
  },
  {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    nameKey: 'gamification.badges.dedicated_learner.name',
    description: 'Complete 10 learning modules',
    descriptionKey: 'gamification.badges.dedicated_learner.description',
    icon: '📚',
    category: 'learning',
    rarity: 'uncommon',
    xpReward: 150,
    criteria: { type: 'modules_completed', target: 10 },
  },
  {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    nameKey: 'gamification.badges.knowledge_seeker.name',
    description: 'Complete 50 learning modules',
    descriptionKey: 'gamification.badges.knowledge_seeker.description',
    icon: '🎓',
    category: 'learning',
    rarity: 'rare',
    xpReward: 500,
    criteria: { type: 'modules_completed', target: 50 },
  },
  {
    id: 'path_pioneer',
    name: 'Path Pioneer',
    nameKey: 'gamification.badges.path_pioneer.name',
    description: 'Complete your first learning path',
    descriptionKey: 'gamification.badges.path_pioneer.description',
    icon: '🛤️',
    category: 'learning',
    rarity: 'uncommon',
    xpReward: 200,
    criteria: { type: 'paths_completed', target: 1 },
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    nameKey: 'gamification.badges.perfectionist.name',
    description: 'Get 100% on 5 quizzes',
    descriptionKey: 'gamification.badges.perfectionist.description',
    icon: '💯',
    category: 'learning',
    rarity: 'rare',
    xpReward: 300,
    criteria: { type: 'perfect_quizzes', target: 5 },
  },
  {
    id: 'streak_starter',
    name: 'Streak Starter',
    nameKey: 'gamification.badges.streak_starter.name',
    description: 'Maintain a 3-day learning streak',
    descriptionKey: 'gamification.badges.streak_starter.description',
    icon: '🔥',
    category: 'learning',
    rarity: 'common',
    xpReward: 75,
    criteria: { type: 'streak_days', target: 3 },
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    nameKey: 'gamification.badges.week_warrior.name',
    description: 'Maintain a 7-day learning streak',
    descriptionKey: 'gamification.badges.week_warrior.description',
    icon: '⚔️',
    category: 'learning',
    rarity: 'uncommon',
    xpReward: 200,
    criteria: { type: 'streak_days', target: 7 },
  },
  {
    id: 'month_master',
    name: 'Month Master',
    nameKey: 'gamification.badges.month_master.name',
    description: 'Maintain a 30-day learning streak',
    descriptionKey: 'gamification.badges.month_master.description',
    icon: '👑',
    category: 'learning',
    rarity: 'epic',
    xpReward: 1000,
    criteria: { type: 'streak_days', target: 30 },
  },
  
  // Explorer badges
  {
    id: 'disease_explorer',
    name: 'Disease Explorer',
    nameKey: 'gamification.badges.disease_explorer.name',
    description: 'View 25 different diseases',
    descriptionKey: 'gamification.badges.disease_explorer.description',
    icon: '🔬',
    category: 'explorer',
    rarity: 'uncommon',
    xpReward: 150,
    criteria: { type: 'diseases_viewed', target: 25 },
  },
  {
    id: 'pharmacology_fan',
    name: 'Pharmacology Fan',
    nameKey: 'gamification.badges.pharmacology_fan.name',
    description: 'View 20 different medications',
    descriptionKey: 'gamification.badges.pharmacology_fan.description',
    icon: '💊',
    category: 'explorer',
    rarity: 'uncommon',
    xpReward: 150,
    criteria: { type: 'medications_viewed', target: 20 },
  },
  {
    id: 'protocol_pro',
    name: 'Protocol Pro',
    nameKey: 'gamification.badges.protocol_pro.name',
    description: 'View 10 clinical protocols',
    descriptionKey: 'gamification.badges.protocol_pro.description',
    icon: '📋',
    category: 'explorer',
    rarity: 'uncommon',
    xpReward: 150,
    criteria: { type: 'protocols_viewed', target: 10 },
  },
  
  // Academic badges
  {
    id: 'citation_scholar',
    name: 'Citation Scholar',
    nameKey: 'gamification.badges.citation_scholar.name',
    description: 'Read 50 citations',
    descriptionKey: 'gamification.badges.citation_scholar.description',
    icon: '📖',
    category: 'academic',
    rarity: 'uncommon',
    xpReward: 200,
    criteria: { type: 'citations_viewed', target: 50 },
  },
  {
    id: 'data_exporter',
    name: 'Data Exporter',
    nameKey: 'gamification.badges.data_exporter.name',
    description: 'Export 5 documents',
    descriptionKey: 'gamification.badges.data_exporter.description',
    icon: '📤',
    category: 'academic',
    rarity: 'common',
    xpReward: 100,
    criteria: { type: 'exports_completed', target: 5 },
  },
  
  // Special badges
  {
    id: 'early_adopter',
    name: 'Early Adopter',
    nameKey: 'gamification.badges.early_adopter.name',
    description: 'Join Darwin MFC in 2025',
    descriptionKey: 'gamification.badges.early_adopter.description',
    icon: '🌟',
    category: 'special',
    rarity: 'legendary',
    xpReward: 500,
    criteria: { type: 'custom', target: 1, condition: 'joined_2025' },
    secret: true,
  },
];

// =============================================================================
// LEVEL DEFINITIONS
// =============================================================================

export const LEVELS: UserLevel[] = [
  { level: 1, title: 'Novice', titleKey: 'gamification.levels.novice', minXP: 0, maxXP: 100, icon: '🌱' },
  { level: 2, title: 'Apprentice', titleKey: 'gamification.levels.apprentice', minXP: 100, maxXP: 300, icon: '📗' },
  { level: 3, title: 'Student', titleKey: 'gamification.levels.student', minXP: 300, maxXP: 600, icon: '📘' },
  { level: 4, title: 'Scholar', titleKey: 'gamification.levels.scholar', minXP: 600, maxXP: 1000, icon: '📙' },
  { level: 5, title: 'Practitioner', titleKey: 'gamification.levels.practitioner', minXP: 1000, maxXP: 1500, icon: '🩺' },
  { level: 6, title: 'Expert', titleKey: 'gamification.levels.expert', minXP: 1500, maxXP: 2500, icon: '🎖️' },
  { level: 7, title: 'Master', titleKey: 'gamification.levels.master', minXP: 2500, maxXP: 4000, icon: '🏅' },
  { level: 8, title: 'Specialist', titleKey: 'gamification.levels.specialist', minXP: 4000, maxXP: 6000, icon: '🏆' },
  { level: 9, title: 'Authority', titleKey: 'gamification.levels.authority', minXP: 6000, maxXP: 10000, icon: '👨‍⚕️' },
  { level: 10, title: 'Legend', titleKey: 'gamification.levels.legend', minXP: 10000, maxXP: Infinity, icon: '🌟' },
];

/**
 * Get user level from XP
 */
export function getLevelFromXP(xp: number): UserLevel {
  return LEVELS.find(level => xp >= level.minXP && xp < level.maxXP) || LEVELS[0];
}

/**
 * Calculate XP progress to next level
 */
export function getXPProgress(xp: number): { current: number; required: number; percentage: number } {
  const level = getLevelFromXP(xp);
  const current = xp - level.minXP;
  const required = level.maxXP - level.minXP;
  const percentage = Math.min(100, Math.round((current / required) * 100));
  return { current, required, percentage };
}

/**
 * Get badge by ID
 */
export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find(b => b.id === id);
}

/**
 * Get badges by category
 */
export function getBadgesByCategory(category: BadgeCategory): Badge[] {
  return BADGES.filter(b => b.category === category);
}

/**
 * Get rarity color for badge
 */
export function getBadgeRarityColor(rarity: BadgeRarity): string {
  const colors: Record<BadgeRarity, string> = {
    common: 'text-neutral-500 bg-neutral-100 dark:bg-neutral-800',
    uncommon: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    rare: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    epic: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    legendary: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
  };
  return colors[rarity];
}
