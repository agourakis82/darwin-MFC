-- =====================================================
-- DARWIN-MFC - FULL SCHEMA
-- =====================================================
-- Migration: 002_full_schema
-- Created: January 2026
-- Description: Complete database schema for Darwin-MFC
-- Includes: users, preferences, progress, favorites, notes,
--           learning, gamification, community, analytics
-- =====================================================

-- Enable UUID extension in public schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
-- gen_random_uuid() requires pgcrypto
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- USERS TABLE (extends profiles)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  specialty TEXT,
  country TEXT,
  institution TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'verified', 'moderator', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- USER PREFERENCES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('light', 'dark')),
  language TEXT DEFAULT 'pt' CHECK (language IN ('pt', 'en', 'es', 'fr', 'ru', 'ar', 'zh', 'el', 'hi')),
  content_mode TEXT DEFAULT 'descriptive' CHECK (content_mode IN ('descriptive', 'critical_analysis')),
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- USER PROGRESS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('disease', 'medication', 'protocol', 'case', 'calculator', 'learning_path', 'module')),
  entity_id TEXT NOT NULL,
  progress NUMERIC(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0 CHECK (time_spent_seconds >= 0),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(user_id, entity_type, entity_id)
);

-- =====================================================
-- FAVORITES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('disease', 'medication', 'protocol', 'case', 'calculator', 'article')),
  entity_id TEXT NOT NULL,
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(user_id, entity_type, entity_id)
);

-- =====================================================
-- NOTES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('disease', 'medication', 'protocol', 'case', 'patient', 'general')),
  entity_id TEXT,
  title TEXT,
  content TEXT NOT NULL,
  tags TEXT[],
  is_private BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- LEARNING PROGRESS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  path_id TEXT NOT NULL,
  module_id TEXT,
  score NUMERIC(5,2),
  attempts INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  last_quiz_score NUMERIC(5,2),
  quiz_history JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(user_id, path_id, module_id)
);

-- =====================================================
-- QUIZ ATTEMPTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  module_id TEXT,
  score NUMERIC(5,2) NOT NULL,
  answers JSONB NOT NULL,
  time_taken_seconds INTEGER,
  passed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- XP & GAMIFICATION
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_xp (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0 CHECK (total_xp >= 0),
  level INTEGER DEFAULT 1 CHECK (level >= 1),
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  last_activity_date DATE,
  daily_goal_met_count INTEGER DEFAULT 0,
  weekly_goal_met_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- BADGES & ACHIEVEMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT CHECK (category IN ('learning', 'practice', 'community', 'milestone', 'special')),
  criteria JSONB NOT NULL,
  xp_reward INTEGER DEFAULT 0,
  rarity TEXT CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL REFERENCES public.badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  metadata JSONB DEFAULT '{}',

  UNIQUE(user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  target INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  UNIQUE(user_id, achievement_id)
);

-- =====================================================
-- COMMUNITY: SHARED CASES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.shared_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.case_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.shared_cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.case_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_verified_answer BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- ANALYTICS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  session_start TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  session_end TIMESTAMPTZ,
  duration_seconds INTEGER,
  pages_visited TEXT[],
  actions_count INTEGER DEFAULT 0,
  device_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
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
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- User preferences policies
CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);

-- Progress policies
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);

-- Notes policies
CREATE POLICY "Users can view own notes" ON public.notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own notes" ON public.notes FOR ALL USING (auth.uid() = user_id);

-- Learning progress policies
CREATE POLICY "Users can view own learning" ON public.learning_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own learning" ON public.learning_progress FOR ALL USING (auth.uid() = user_id);

-- Quiz attempts policies
CREATE POLICY "Users can view own attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- XP policies
CREATE POLICY "Users can view own xp" ON public.user_xp FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON public.xp_transactions FOR SELECT USING (auth.uid() = user_id);

-- Badges policies (read-only for users)
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Users can view own user_badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

-- Shared cases policies
CREATE POLICY "Anyone can view published cases" ON public.shared_cases FOR SELECT USING (published = true OR auth.uid() = user_id);
CREATE POLICY "Users can manage own cases" ON public.shared_cases FOR ALL USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Anyone can view comments" ON public.case_comments FOR SELECT USING (true);
CREATE POLICY "Users can insert comments" ON public.case_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON public.case_comments FOR UPDATE USING (auth.uid() = user_id);

-- Session/activity policies
CREATE POLICY "Users can view own sessions" ON public.user_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert sessions" ON public.user_sessions FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can view own activity" ON public.activity_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert activity" ON public.activity_log FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Calculate level from XP
CREATE OR REPLACE FUNCTION public.calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Level formula: level = floor(sqrt(xp / 100)) + 1
  -- Level 1: 0-99 XP
  -- Level 2: 100-399 XP
  -- Level 3: 400-899 XP
  -- etc.
  RETURN GREATEST(1, FLOOR(SQRT(xp / 100.0)) + 1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Award XP to user
CREATE OR REPLACE FUNCTION public.award_xp(
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
  -- Insert transaction
  INSERT INTO public.xp_transactions (user_id, amount, reason, entity_type, entity_id)
  VALUES (p_user_id, p_amount, p_reason, p_entity_type, p_entity_id);

  -- Update user XP
  UPDATE public.user_xp
  SET
    total_xp = total_xp + p_amount,
    level = public.calculate_level(total_xp + p_amount),
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING total_xp INTO v_new_xp;

  -- Create user_xp record if doesn't exist
  IF NOT FOUND THEN
    INSERT INTO public.user_xp (user_id, total_xp, level)
    VALUES (p_user_id, p_amount, public.calculate_level(p_amount));
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update user streak
CREATE OR REPLACE FUNCTION public.update_user_streak(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  v_last_date DATE;
  v_today DATE := CURRENT_DATE;
  v_new_streak INTEGER;
BEGIN
  SELECT last_activity_date, current_streak INTO v_last_date, v_new_streak
  FROM public.user_xp
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    -- Create new record
    INSERT INTO public.user_xp (user_id, current_streak, longest_streak, last_activity_date)
    VALUES (p_user_id, 1, 1, v_today);
    RETURN;
  END IF;

  IF v_last_date IS NULL OR v_last_date < v_today - INTERVAL '1 day' THEN
    -- Streak broken or first activity
    v_new_streak := 1;
  ELSIF v_last_date = v_today - INTERVAL '1 day' THEN
    -- Consecutive day
    v_new_streak := v_new_streak + 1;
  ELSIF v_last_date = v_today THEN
    -- Already recorded today, no change
    RETURN;
  END IF;

  UPDATE public.user_xp
  SET
    current_streak = v_new_streak,
    longest_streak = GREATEST(longest_streak, v_new_streak),
    last_activity_date = v_today,
    updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Auto-create user record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );

  -- Create default preferences
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);

  -- Create XP record
  INSERT INTO public.user_xp (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER on_users_updated BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_user_preferences_updated BEFORE UPDATE ON public.user_preferences FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_user_progress_updated BEFORE UPDATE ON public.user_progress FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_notes_updated BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_learning_progress_updated BEFORE UPDATE ON public.learning_progress FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_user_xp_updated BEFORE UPDATE ON public.user_xp FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_user_achievements_updated BEFORE UPDATE ON public.user_achievements FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_shared_cases_updated BEFORE UPDATE ON public.shared_cases FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_case_comments_updated BEFORE UPDATE ON public.case_comments FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- INDEXES
-- =====================================================

-- Users
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Progress
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_entity ON public.user_progress(entity_type, entity_id);

-- Favorites
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_entity ON public.favorites(entity_type, entity_id);

-- Notes
CREATE INDEX IF NOT EXISTS idx_notes_user ON public.notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_entity ON public.notes(entity_type, entity_id);

-- Learning
CREATE INDEX IF NOT EXISTS idx_learning_user ON public.learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_path ON public.learning_progress(path_id);

-- Quiz
CREATE INDEX IF NOT EXISTS idx_quiz_user ON public.quiz_attempts(user_id);

-- XP
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user ON public.xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_date ON public.xp_transactions(created_at DESC);

-- Badges
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON public.user_badges(user_id);

-- Cases
CREATE INDEX IF NOT EXISTS idx_shared_cases_user ON public.shared_cases(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_cases_published ON public.shared_cases(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_case_comments_case ON public.case_comments(case_id);

-- Activity
CREATE INDEX IF NOT EXISTS idx_activity_user ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_date ON public.activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON public.user_sessions(user_id);

-- =====================================================
-- SEED DATA: BADGES
-- =====================================================

INSERT INTO public.badges (id, name, description, category, criteria, xp_reward, rarity) VALUES
('first-login', 'Bem-vindo', 'Primeiro acesso ao Darwin-MFC', 'milestone', '{"type": "login", "count": 1}', 10, 'common'),
('streak-7', 'Uma Semana', '7 dias consecutivos de estudo', 'milestone', '{"type": "streak", "count": 7}', 50, 'uncommon'),
('streak-30', 'Dedicação Mensal', '30 dias consecutivos de estudo', 'milestone', '{"type": "streak", "count": 30}', 200, 'rare'),
('streak-100', 'Centurião', '100 dias consecutivos de estudo', 'milestone', '{"type": "streak", "count": 100}', 500, 'epic'),
('streak-365', 'Mestre do Ano', '365 dias consecutivos de estudo', 'milestone', '{"type": "streak", "count": 365}', 2000, 'legendary'),
('quiz-master', 'Mestre dos Quizzes', 'Acertou 100% em 10 quizzes', 'learning', '{"type": "quiz_perfect", "count": 10}', 100, 'rare'),
('path-complete', 'Trilha Completa', 'Completou uma trilha de aprendizado', 'learning', '{"type": "path_complete", "count": 1}', 150, 'uncommon'),
('cases-10', 'Estudante de Casos', 'Estudou 10 casos clínicos', 'practice', '{"type": "cases", "count": 10}', 100, 'uncommon'),
('calculator-pro', 'Calculista', 'Usou 20 calculadoras diferentes', 'practice', '{"type": "calculators", "count": 20}', 75, 'uncommon'),
('first-note', 'Anotador', 'Criou sua primeira anotação', 'learning', '{"type": "notes", "count": 1}', 10, 'common'),
('community-first', 'Comunitário', 'Compartilhou seu primeiro caso', 'community', '{"type": "shared_case", "count": 1}', 50, 'uncommon')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VERIFICATION
-- =====================================================

DO $$
DECLARE
  table_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN (
    'users', 'user_preferences', 'user_progress', 'favorites', 'notes',
    'learning_progress', 'quiz_attempts', 'user_xp', 'xp_transactions',
    'badges', 'user_badges', 'user_achievements', 'shared_cases',
    'case_comments', 'user_sessions', 'activity_log'
  );

  IF table_count = 16 THEN
    RAISE NOTICE '✅ All 16 tables created successfully';
  ELSE
    RAISE WARNING '⚠️ Only % of 16 tables created', table_count;
  END IF;
END $$;
