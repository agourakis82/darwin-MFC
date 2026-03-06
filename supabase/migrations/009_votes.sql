-- =====================================================
-- DARWIN-MFC - VOTES (CASES, COMMENTS, FORUM)
-- =====================================================
-- Migration: 009_votes
-- Created: February 2026
-- Description: Vote tables + RPCs + count sync (materialized up/down counters)
-- =====================================================

-- =========================
-- Vote tables
-- =========================

-- Ensure case_comments supports full vote semantics
ALTER TABLE public.case_comments
  ADD COLUMN IF NOT EXISTS downvotes INTEGER DEFAULT 0 CHECK (downvotes >= 0);

CREATE TABLE IF NOT EXISTS public.case_votes (
  case_id UUID NOT NULL REFERENCES public.shared_cases(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (case_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.comment_votes (
  comment_id UUID NOT NULL REFERENCES public.case_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (comment_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.post_votes (
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.reply_votes (
  reply_id UUID NOT NULL REFERENCES public.forum_replies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  vote SMALLINT NOT NULL CHECK (vote IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (reply_id, user_id)
);

ALTER TABLE public.case_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reply_votes ENABLE ROW LEVEL SECURITY;

-- Users manage own votes
CREATE POLICY "Users can view own case votes" ON public.case_votes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own case votes" ON public.case_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own case votes" ON public.case_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own case votes" ON public.case_votes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own comment votes" ON public.comment_votes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own comment votes" ON public.comment_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comment votes" ON public.comment_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comment votes" ON public.comment_votes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own post votes" ON public.post_votes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own post votes" ON public.post_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own post votes" ON public.post_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own post votes" ON public.post_votes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reply votes" ON public.reply_votes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reply votes" ON public.reply_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reply votes" ON public.reply_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reply votes" ON public.reply_votes FOR DELETE USING (auth.uid() = user_id);

-- =========================
-- Count sync helpers
-- =========================

CREATE OR REPLACE FUNCTION public.sync_case_vote_counts(p_case_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.shared_cases
  SET
    upvotes = (SELECT COUNT(*) FROM public.case_votes WHERE case_id = p_case_id AND vote = 1),
    downvotes = (SELECT COUNT(*) FROM public.case_votes WHERE case_id = p_case_id AND vote = -1)
  WHERE id = p_case_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.sync_comment_vote_counts(p_comment_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.case_comments
  SET
    upvotes = (SELECT COUNT(*) FROM public.comment_votes WHERE comment_id = p_comment_id AND vote = 1),
    downvotes = (SELECT COUNT(*) FROM public.comment_votes WHERE comment_id = p_comment_id AND vote = -1)
  WHERE id = p_comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.sync_post_vote_counts(p_post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.forum_posts
  SET
    upvotes = (SELECT COUNT(*) FROM public.post_votes WHERE post_id = p_post_id AND vote = 1),
    downvotes = (SELECT COUNT(*) FROM public.post_votes WHERE post_id = p_post_id AND vote = -1)
  WHERE id = p_post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.sync_reply_vote_counts(p_reply_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.forum_replies
  SET
    upvotes = (SELECT COUNT(*) FROM public.reply_votes WHERE reply_id = p_reply_id AND vote = 1),
    downvotes = (SELECT COUNT(*) FROM public.reply_votes WHERE reply_id = p_reply_id AND vote = -1)
  WHERE id = p_reply_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Triggers to keep counters correct
CREATE OR REPLACE FUNCTION public.trg_sync_case_votes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.sync_case_vote_counts(COALESCE(NEW.case_id, OLD.case_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.trg_sync_comment_votes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.sync_comment_vote_counts(COALESCE(NEW.comment_id, OLD.comment_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.trg_sync_post_votes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.sync_post_vote_counts(COALESCE(NEW.post_id, OLD.post_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.trg_sync_reply_votes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.sync_reply_vote_counts(COALESCE(NEW.reply_id, OLD.reply_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_case_votes_sync ON public.case_votes;
CREATE TRIGGER on_case_votes_sync
  AFTER INSERT OR UPDATE OR DELETE ON public.case_votes
  FOR EACH ROW EXECUTE FUNCTION public.trg_sync_case_votes();

DROP TRIGGER IF EXISTS on_comment_votes_sync ON public.comment_votes;
CREATE TRIGGER on_comment_votes_sync
  AFTER INSERT OR UPDATE OR DELETE ON public.comment_votes
  FOR EACH ROW EXECUTE FUNCTION public.trg_sync_comment_votes();

DROP TRIGGER IF EXISTS on_post_votes_sync ON public.post_votes;
CREATE TRIGGER on_post_votes_sync
  AFTER INSERT OR UPDATE OR DELETE ON public.post_votes
  FOR EACH ROW EXECUTE FUNCTION public.trg_sync_post_votes();

DROP TRIGGER IF EXISTS on_reply_votes_sync ON public.reply_votes;
CREATE TRIGGER on_reply_votes_sync
  AFTER INSERT OR UPDATE OR DELETE ON public.reply_votes
  FOR EACH ROW EXECUTE FUNCTION public.trg_sync_reply_votes();

-- =========================
-- RPC helpers (optional client API)
-- =========================

CREATE OR REPLACE FUNCTION public.vote_case(p_case_id UUID, p_vote SMALLINT)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_vote = 0 THEN
    DELETE FROM public.case_votes WHERE case_id = p_case_id AND user_id = v_user_id;
  ELSE
    INSERT INTO public.case_votes (case_id, user_id, vote)
    VALUES (p_case_id, v_user_id, p_vote)
    ON CONFLICT (case_id, user_id) DO UPDATE SET vote = EXCLUDED.vote;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.vote_comment(p_comment_id UUID, p_vote SMALLINT)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_vote = 0 THEN
    DELETE FROM public.comment_votes WHERE comment_id = p_comment_id AND user_id = v_user_id;
  ELSE
    INSERT INTO public.comment_votes (comment_id, user_id, vote)
    VALUES (p_comment_id, v_user_id, p_vote)
    ON CONFLICT (comment_id, user_id) DO UPDATE SET vote = EXCLUDED.vote;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.vote_post(p_post_id UUID, p_vote SMALLINT)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_vote = 0 THEN
    DELETE FROM public.post_votes WHERE post_id = p_post_id AND user_id = v_user_id;
  ELSE
    INSERT INTO public.post_votes (post_id, user_id, vote)
    VALUES (p_post_id, v_user_id, p_vote)
    ON CONFLICT (post_id, user_id) DO UPDATE SET vote = EXCLUDED.vote;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.vote_reply(p_reply_id UUID, p_vote SMALLINT)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF p_vote = 0 THEN
    DELETE FROM public.reply_votes WHERE reply_id = p_reply_id AND user_id = v_user_id;
  ELSE
    INSERT INTO public.reply_votes (reply_id, user_id, vote)
    VALUES (p_reply_id, v_user_id, p_vote)
    ON CONFLICT (reply_id, user_id) DO UPDATE SET vote = EXCLUDED.vote;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
