/**
 * DARWIN-MFC COMMUNITY TYPES
 * ==========================
 *
 * Type definitions for the community platform.
 * Forums, case discussions, and mentorship.
 */

// =============================================================================
// USER TYPES
// =============================================================================

export interface CommunityUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  locale: string;
  countryCode?: string;
  specialization?: Specialization;
  experienceLevel: ExperienceLevel;
  isMentor: boolean;
  isVerified: boolean;
  joinedAt: string;
  postCount: number;
  replyCount: number;
  reputation: number;
  badges: Badge[];
}

export type Specialization =
  | 'family_medicine'
  | 'internal_medicine'
  | 'pediatrics'
  | 'obstetrics'
  | 'emergency'
  | 'mental_health'
  | 'geriatrics'
  | 'public_health'
  | 'nursing'
  | 'other';

export type ExperienceLevel =
  | 'student'
  | 'resident'
  | 'early_career' // 0-5 years
  | 'mid_career' // 5-15 years
  | 'senior'; // 15+ years

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  earnedAt: string;
}

export type BadgeType =
  | 'contributor' // Active poster
  | 'helper' // Many accepted answers
  | 'mentor' // Verified mentor
  | 'expert' // High reputation
  | 'early_adopter' // Early platform user
  | 'course_complete'; // Completed a learning path

// =============================================================================
// FORUM TYPES
// =============================================================================

export interface ForumCategory {
  id: string;
  nameKey: string; // i18n key
  descriptionKey: string;
  icon: string;
  color: string;
  postCount: number;
  isRestricted: boolean;
  order: number;
}

export const FORUM_CATEGORIES: ForumCategory[] = [
  {
    id: 'clinical',
    nameKey: 'community.categories.clinical',
    descriptionKey: 'community.categories.clinical_desc',
    icon: 'Stethoscope',
    color: 'text-blue-500',
    postCount: 0,
    isRestricted: false,
    order: 1,
  },
  {
    id: 'cases',
    nameKey: 'community.categories.cases',
    descriptionKey: 'community.categories.cases_desc',
    icon: 'FileText',
    color: 'text-green-500',
    postCount: 0,
    isRestricted: false,
    order: 2,
  },
  {
    id: 'study_groups',
    nameKey: 'community.categories.study_groups',
    descriptionKey: 'community.categories.study_groups_desc',
    icon: 'Users',
    color: 'text-purple-500',
    postCount: 0,
    isRestricted: false,
    order: 3,
  },
  {
    id: 'regional',
    nameKey: 'community.categories.regional',
    descriptionKey: 'community.categories.regional_desc',
    icon: 'Globe',
    color: 'text-amber-500',
    postCount: 0,
    isRestricted: false,
    order: 4,
  },
];

export interface ForumPost {
  id: string;
  authorId: string;
  author: CommunityUser;
  categoryId: string;
  locale: string;
  title: string;
  content: string; // Markdown
  tags: string[];
  isCase: boolean; // Clinical case discussion
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
  replyCount: number;
  upvoteCount: number;
  createdAt: string;
  updatedAt: string;
  lastReplyAt?: string;
  lastReplyBy?: CommunityUser;
}

export interface ForumReply {
  id: string;
  postId: string;
  authorId: string;
  author: CommunityUser;
  content: string; // Markdown
  isAccepted: boolean; // Marked as best answer
  upvoteCount: number;
  createdAt: string;
  updatedAt: string;
  parentReplyId?: string; // For nested replies
}

// =============================================================================
// CLINICAL CASE TYPES
// =============================================================================

export interface ClinicalCasePost extends ForumPost {
  isCase: true;
  caseData: ClinicalCaseData;
  anonymizationStatus: AnonymizationStatus;
}

export interface ClinicalCaseData {
  // Anonymized patient info
  ageRange: AgeRange;
  sex: 'M' | 'F' | 'other';
  occupation?: string; // General category only

  // Clinical presentation
  presentation: string; // Chief complaint (anonymized)
  history: string; // Relevant history (anonymized)
  physicalExam?: string;
  labResults?: string;
  imaging?: string;

  // Diagnostic codes (ICD-11, ICPC-2)
  diagnosisCodes: string[];

  // Case type
  type: CaseType;
  difficulty: 'straightforward' | 'moderate' | 'complex';
}

export type AgeRange =
  | '0-1'
  | '1-5'
  | '5-12'
  | '12-18'
  | '18-30'
  | '30-40'
  | '40-50'
  | '50-60'
  | '60-70'
  | '70-80'
  | '80+';

export type CaseType =
  | 'diagnostic_challenge'
  | 'treatment_decision'
  | 'management_dilemma'
  | 'ethical_question'
  | 'educational';

export type AnonymizationStatus =
  | 'pending' // Awaiting review
  | 'auto_anonymized' // Automatically processed
  | 'peer_reviewed' // Reviewed by moderator
  | 'published' // Approved for public
  | 'rejected'; // Contains identifiable info

// =============================================================================
// MENTORSHIP TYPES
// =============================================================================

export interface MentorProfile extends CommunityUser {
  isMentor: true;
  mentorBio: string;
  mentorSpecializations: Specialization[];
  mentorLanguages: string[];
  mentorAvailability: MentorAvailability;
  menteeCount: number;
  maxMentees: number;
  mentorRating?: number;
  mentorReviews: MentorReview[];
}

export type MentorAvailability =
  | 'available'
  | 'limited'
  | 'unavailable';

export interface MentorReview {
  id: string;
  menteeId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: string;
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  menteeId: string;
  message: string;
  status: MentorshipStatus;
  specialization: Specialization;
  createdAt: string;
  respondedAt?: string;
}

export type MentorshipStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'completed'
  | 'cancelled';

export interface Mentorship {
  id: string;
  mentorId: string;
  mentor: MentorProfile;
  menteeId: string;
  mentee: CommunityUser;
  status: 'active' | 'paused' | 'completed';
  specialization: Specialization;
  startedAt: string;
  lastActivityAt: string;
  completedAt?: string;
  messageCount: number;
}

export interface MentorshipMessage {
  id: string;
  mentorshipId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

// =============================================================================
// MODERATION TYPES
// =============================================================================

export interface ModerationAction {
  id: string;
  targetType: 'post' | 'reply' | 'user';
  targetId: string;
  action: ModerationType;
  moderatorId: string;
  reason: string;
  createdAt: string;
  expiresAt?: string;
}

export type ModerationType =
  | 'warn'
  | 'edit'
  | 'delete'
  | 'hide'
  | 'lock'
  | 'ban_temp'
  | 'ban_perm';

export interface Report {
  id: string;
  reporterId: string;
  targetType: 'post' | 'reply' | 'user';
  targetId: string;
  reason: ReportReason;
  details?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export type ReportReason =
  | 'spam'
  | 'harassment'
  | 'pii_violation' // Contains identifiable patient info
  | 'misinformation'
  | 'off_topic'
  | 'other';

// =============================================================================
// UI HELPER TYPES
// =============================================================================

export interface PostSummary {
  id: string;
  title: string;
  excerpt: string;
  author: Pick<CommunityUser, 'id' | 'username' | 'displayName' | 'avatarUrl'>;
  categoryId: string;
  isCase: boolean;
  replyCount: number;
  viewCount: number;
  lastActivity: string;
}

export interface ThreadView {
  post: ForumPost;
  replies: ForumReply[];
  relatedPosts: PostSummary[];
}
