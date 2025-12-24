-- =====================================================
-- DARWIN-MFC SUPABASE SCHEMA
-- =====================================================
--
-- Database schema for Darwin Medical Foundation Cluster
-- Open-science clinical decision support platform
--
-- Version: 1.0.0
-- Created: 2025-12-23
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- USERS & PROFILES
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  specialty TEXT,
  country TEXT,
  institution TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'verified', 'moderator', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences
CREATE TABLE public.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('light', 'dark')),
  language TEXT DEFAULT 'pt' CHECK (language IN ('pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi')),
  content_mode TEXT DEFAULT 'descriptive' CHECK (content_mode IN ('descriptive', 'critical_analysis')),
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- USER ACTIVITY & PROGRESS
-- =====================================================

-- Generic progress tracking for any entity (disease, medication, protocol, case, etc.)
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('disease', 'medication', 'protocol', 'case', 'calculator', 'learning_path', 'module')),
  entity_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  time_spent_seconds INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

-- Index for fast lookups
CREATE INDEX idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_entity ON public.user_progress(entity_type, entity_id);
CREATE INDEX idx_user_progress_completed ON public.user_progress(user_id, completed);

-- Favorites/bookmarks
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('disease', 'medication', 'protocol', 'case', 'calculator', 'article')),
  entity_id TEXT NOT NULL,
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

CREATE INDEX idx_favorites_user ON public.favorites(user_id);

-- User notes (can be attached to any entity)
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('disease', 'medication', 'protocol', 'case', 'patient', 'general')),
  entity_id TEXT,
  title TEXT,
  content TEXT NOT NULL,
  tags TEXT[],
  is_private BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notes_user ON public.notes(user_id);
CREATE INDEX idx_notes_entity ON public.notes(entity_type, entity_id);

-- =====================================================
-- LEARNING & EDUCATION
-- =====================================================

-- Learning path progress
CREATE TABLE public.learning_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  path_id TEXT NOT NULL,
  module_id TEXT,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  attempts INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  last_quiz_score INTEGER,
  quiz_history JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, path_id, module_id)
);

CREATE INDEX idx_learning_progress_user ON public.learning_progress(user_id);
CREATE INDEX idx_learning_progress_path ON public.learning_progress(path_id);

-- Quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  module_id TEXT,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  answers JSONB NOT NULL,
  time_taken_seconds INTEGER,
  passed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz ON public.quiz_attempts(quiz_id);

-- =====================================================
-- GAMIFICATION
-- =====================================================

-- User XP and levels
CREATE TABLE public.user_xp (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  level INTEGER DEFAULT 1 CHECK (level >= 1),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  daily_goal_met_count INTEGER DEFAULT 0,
  weekly_goal_met_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- XP transactions log
CREATE TABLE public.xp_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_xp_transactions_user ON public.xp_transactions(user_id);

-- Badges/achievements definitions (could be seeded)
CREATE TABLE public.badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT CHECK (category IN ('learning', 'practice', 'community', 'milestone', 'special')),
  criteria JSONB NOT NULL,
  xp_reward INTEGER DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User badges earned
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL REFERENCES public.badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON public.user_badges(user_id);

-- User achievements (time-based, progressive)
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  target INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON public.user_achievements(user_id);

-- =====================================================
-- COMMUNITY & COLLABORATION
-- =====================================================

-- User-generated clinical cases (anonymous sharing)
CREATE TABLE public.shared_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  specialty TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert')),
  case_data JSONB NOT NULL,
  anonymized BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES public.users(id),
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shared_cases_user ON public.shared_cases(user_id);
CREATE INDEX idx_shared_cases_published ON public.shared_cases(published, verified);

-- Case discussions/comments
CREATE TABLE public.case_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES public.shared_cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.case_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_verified_answer BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_case_comments_case ON public.case_comments(case_id);
CREATE INDEX idx_case_comments_user ON public.case_comments(user_id);

-- =====================================================
-- ANALYTICS & INSIGHTS
-- =====================================================

-- Session tracking
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  session_start TIMESTAMPTZ DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  duration_seconds INTEGER,
  pages_visited TEXT[],
  actions_count INTEGER DEFAULT 0,
  device_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_sessions_user ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_start ON public.user_sessions(session_start);

-- User activity log (for audit and analytics)
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_user ON public.activity_log(user_id);
CREATE INDEX idx_activity_log_action ON public.activity_log(action);
CREATE INDEX idx_activity_log_created ON public.activity_log(created_at);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Users: can read own profile, admins can read all
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- User preferences: users manage their own
CREATE POLICY "Users manage own preferences" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- User progress: users manage their own
CREATE POLICY "Users manage own progress" ON public.user_progress
  FOR ALL USING (auth.uid() = user_id);

-- Favorites: users manage their own
CREATE POLICY "Users manage own favorites" ON public.favorites
  FOR ALL USING (auth.uid() = user_id);

-- Notes: users manage their own
CREATE POLICY "Users manage own notes" ON public.notes
  FOR ALL USING (auth.uid() = user_id);

-- Learning progress: users manage their own
CREATE POLICY "Users manage own learning progress" ON public.learning_progress
  FOR ALL USING (auth.uid() = user_id);

-- Quiz attempts: users manage their own
CREATE POLICY "Users manage own quiz attempts" ON public.quiz_attempts
  FOR ALL USING (auth.uid() = user_id);

-- XP: users can read own, system updates
CREATE POLICY "Users view own XP" ON public.user_xp
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users view own XP transactions" ON public.xp_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Badges: users view own
CREATE POLICY "Users view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

-- Public badges are viewable by all authenticated users
CREATE POLICY "Badges are viewable by all" ON public.badges
  FOR SELECT USING (auth.role() = 'authenticated');

-- Achievements: users manage own
CREATE POLICY "Users manage own achievements" ON public.user_achievements
  FOR ALL USING (auth.uid() = user_id);

-- Shared cases: users manage own, published cases viewable by all
CREATE POLICY "Users manage own cases" ON public.shared_cases
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Published cases viewable by all" ON public.shared_cases
  FOR SELECT USING (published = true AND auth.role() = 'authenticated');

-- Case comments: users manage own, all can view
CREATE POLICY "Users manage own comments" ON public.case_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own comments" ON public.case_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users delete own comments" ON public.case_comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Comments viewable by all" ON public.case_comments
  FOR SELECT USING (auth.role() = 'authenticated');

-- Sessions: users view own
CREATE POLICY "Users view own sessions" ON public.user_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Activity log: users view own
CREATE POLICY "Users view own activity" ON public.activity_log
  FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON public.notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_progress_updated_at BEFORE UPDATE ON public.learning_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_xp_updated_at BEFORE UPDATE ON public.user_xp
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_achievements_updated_at BEFORE UPDATE ON public.user_achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shared_cases_updated_at BEFORE UPDATE ON public.shared_cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');

  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);

  INSERT INTO public.user_xp (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Calculate level from XP
CREATE OR REPLACE FUNCTION calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Level formula: level = floor(sqrt(xp / 100)) + 1
  -- 100 XP = level 2, 400 XP = level 3, 900 XP = level 4, etc.
  RETURN FLOOR(SQRT(xp::FLOAT / 100.0)) + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Award XP function
CREATE OR REPLACE FUNCTION award_xp(
  p_user_id UUID,
  p_amount INTEGER,
  p_reason TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_new_xp INTEGER;
  v_new_level INTEGER;
BEGIN
  -- Insert XP transaction
  INSERT INTO public.xp_transactions (user_id, amount, reason, entity_type, entity_id)
  VALUES (p_user_id, p_amount, p_reason, p_entity_type, p_entity_id);

  -- Update user XP and level
  UPDATE public.user_xp
  SET
    total_xp = total_xp + p_amount,
    level = calculate_level(total_xp + p_amount),
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING total_xp, level INTO v_new_xp, v_new_level;

  -- Check for level-up badges (could trigger achievements)
  -- This could be expanded with more complex logic
END;
$$ LANGUAGE plpgsql;

-- Update streak function
CREATE OR REPLACE FUNCTION update_user_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  v_last_date DATE;
  v_current_streak INTEGER;
  v_longest_streak INTEGER;
BEGIN
  SELECT last_activity_date, current_streak, longest_streak
  INTO v_last_date, v_current_streak, v_longest_streak
  FROM public.user_xp
  WHERE user_id = p_user_id;

  IF v_last_date IS NULL OR v_last_date < CURRENT_DATE - INTERVAL '1 day' THEN
    -- First activity or streak broken
    v_current_streak := 1;
  ELSIF v_last_date = CURRENT_DATE - INTERVAL '1 day' THEN
    -- Consecutive day
    v_current_streak := v_current_streak + 1;
  END IF;

  -- Update longest streak if needed
  IF v_current_streak > v_longest_streak THEN
    v_longest_streak := v_current_streak;
  END IF;

  UPDATE public.user_xp
  SET
    current_streak = v_current_streak,
    longest_streak = v_longest_streak,
    last_activity_date = CURRENT_DATE,
    updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Composite indexes for common queries
CREATE INDEX idx_user_progress_user_entity ON public.user_progress(user_id, entity_type, completed);
CREATE INDEX idx_learning_progress_user_path ON public.learning_progress(user_id, path_id);
CREATE INDEX idx_shared_cases_published_verified ON public.shared_cases(published, verified, created_at DESC);

-- Full text search indexes (if needed later)
-- CREATE INDEX idx_shared_cases_title_search ON public.shared_cases USING gin(to_tsvector('portuguese', title));

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.users IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE public.user_progress IS 'Track user progress across all learning entities';
COMMENT ON TABLE public.learning_progress IS 'Detailed learning path and module progress';
COMMENT ON TABLE public.user_xp IS 'Gamification XP and levels';
COMMENT ON TABLE public.badges IS 'Available badges/achievements definitions';
COMMENT ON TABLE public.shared_cases IS 'User-generated clinical cases for community learning';

-- =====================================================
-- END OF SCHEMA
-- =====================================================
