-- =====================================================
-- DARWIN-MFC - FORUM (CATEGORIES, POSTS, REPLIES)
-- =====================================================
-- Migration: 008_forum
-- Created: February 2026
-- Description: Forum backbone for community discussions
-- =====================================================

-- Categories (seeded from lib/types/community.ts)
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id TEXT PRIMARY KEY,
  name_key TEXT NOT NULL,
  description_key TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  is_restricted BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Posts
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL REFERENCES public.forum_categories(id) ON DELETE RESTRICT,
  locale TEXT DEFAULT 'pt' NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0 CHECK (view_count >= 0),
  reply_count INTEGER DEFAULT 0 CHECK (reply_count >= 0),
  upvotes INTEGER DEFAULT 0 CHECK (upvotes >= 0),
  downvotes INTEGER DEFAULT 0 CHECK (downvotes >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Replies (supports threads via parent_id)
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.forum_replies(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_accepted BOOLEAN DEFAULT false,
  upvotes INTEGER DEFAULT 0 CHECK (upvotes >= 0),
  downvotes INTEGER DEFAULT 0 CHECK (downvotes >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view forum categories" ON public.forum_categories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view forum posts" ON public.forum_posts
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view forum replies" ON public.forum_replies
  FOR SELECT USING (true);

-- Auth write (own)
CREATE POLICY "Users can insert own posts" ON public.forum_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.forum_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON public.forum_posts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own replies" ON public.forum_replies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own replies" ON public.forum_replies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies" ON public.forum_replies
  FOR DELETE USING (auth.uid() = user_id);

-- Timestamps
CREATE TRIGGER on_forum_posts_updated
  BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_forum_replies_updated
  BEFORE UPDATE ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Keep reply_count in sync
CREATE OR REPLACE FUNCTION public.sync_forum_post_reply_count()
RETURNS TRIGGER AS $$
DECLARE
  v_post_id UUID;
BEGIN
  v_post_id := COALESCE(NEW.post_id, OLD.post_id);
  UPDATE public.forum_posts
  SET reply_count = (
    SELECT COUNT(*) FROM public.forum_replies r WHERE r.post_id = v_post_id
  )
  WHERE id = v_post_id;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_forum_reply_count_sync ON public.forum_replies;
CREATE TRIGGER on_forum_reply_count_sync
  AFTER INSERT OR DELETE ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.sync_forum_post_reply_count();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON public.forum_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_user ON public.forum_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created ON public.forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_replies_post ON public.forum_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_user ON public.forum_replies(user_id);

-- Seed categories (aligned with lib/types/community.ts)
INSERT INTO public.forum_categories (id, name_key, description_key, icon, color, is_restricted, "order") VALUES
('clinical', 'community.categories.clinical', 'community.categories.clinical_desc', 'Stethoscope', 'text-blue-500', false, 1),
('cases', 'community.categories.cases', 'community.categories.cases_desc', 'FileText', 'text-green-500', false, 2),
('study_groups', 'community.categories.study_groups', 'community.categories.study_groups_desc', 'Users', 'text-purple-500', false, 3),
('regional', 'community.categories.regional', 'community.categories.regional_desc', 'Globe', 'text-amber-500', false, 4)
ON CONFLICT (id) DO NOTHING;

