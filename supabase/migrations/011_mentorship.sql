-- =====================================================
-- DARWIN-MFC - MENTORSHIP (MVP)
-- =====================================================
-- Migration: 011_mentorship
-- Created: February 2026
-- Description: Mentor profiles + mentorship requests + reviews
-- =====================================================

CREATE TABLE IF NOT EXISTS public.mentor_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  mentor_bio TEXT,
  specializations TEXT[] DEFAULT '{}'::TEXT[],
  languages TEXT[] DEFAULT '{}'::TEXT[],
  availability TEXT DEFAULT 'available' CHECK (availability IN ('available', 'limited', 'unavailable')),
  max_mentees INTEGER DEFAULT 5 CHECK (max_mentees >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.mentorship_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  mentee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  specialization TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  responded_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.mentor_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  mentee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  request_id UUID REFERENCES public.mentorship_requests(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (mentor_id, mentee_id, request_id)
);

ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_reviews ENABLE ROW LEVEL SECURITY;

-- Public read of mentor profiles (discoverability)
CREATE POLICY "Anyone can view mentor profiles" ON public.mentor_profiles
  FOR SELECT USING (true);

-- Mentors manage their own profile
CREATE POLICY "Users can manage own mentor profile" ON public.mentor_profiles
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Requests: mentor + mentee can view
CREATE POLICY "Mentee can view own requests" ON public.mentorship_requests
  FOR SELECT USING (auth.uid() = mentee_id);

CREATE POLICY "Mentor can view own requests" ON public.mentorship_requests
  FOR SELECT USING (auth.uid() = mentor_id);

-- Mentee inserts request for self
CREATE POLICY "Mentee can create requests" ON public.mentorship_requests
  FOR INSERT WITH CHECK (auth.uid() = mentee_id);

-- Mentor updates status for own requests
CREATE POLICY "Mentor can update requests" ON public.mentorship_requests
  FOR UPDATE USING (auth.uid() = mentor_id);

-- Reviews: mentor + mentee can view; mentee inserts
CREATE POLICY "Users can view related reviews" ON public.mentor_reviews
  FOR SELECT USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Mentee can create reviews" ON public.mentor_reviews
  FOR INSERT WITH CHECK (auth.uid() = mentee_id);

CREATE TRIGGER on_mentor_profiles_updated
  BEFORE UPDATE ON public.mentor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_mentorship_requests_mentor ON public.mentorship_requests(mentor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentorship_requests_mentee ON public.mentorship_requests(mentee_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_reviews_mentor ON public.mentor_reviews(mentor_id, created_at DESC);

