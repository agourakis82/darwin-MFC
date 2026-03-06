-- =====================================================
-- DARWIN-MFC - GUARDRAILS FOR INTERNAL COUNTERS + MODERATION FIELDS
-- =====================================================
-- Migration: 013_guardrails_internal_counters
-- Created: February 2026
-- Description:
--   Prevent clients from directly mutating materialized counters (votes/views/reply_count)
--   and moderation-only fields, while still allowing internal trigger/RPC maintenance.
--
-- Strategy:
--   1) Internal maintenance functions set a LOCAL config flag: darwin.internal_write = '1'
--   2) BEFORE UPDATE triggers reject counter edits unless internal_write is set.
-- =====================================================

-- =========================
-- Helper: is moderator/admin
-- =========================

CREATE OR REPLACE FUNCTION public.is_moderator()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users u
    WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
  );
$$ LANGUAGE sql STABLE;

-- =========================
-- Re-define internal sync functions to set internal_write flag
-- =========================

CREATE OR REPLACE FUNCTION public.sync_case_vote_counts(p_case_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('darwin.internal_write', '1', true);
  UPDATE public.shared_cases
  SET
    upvotes = (SELECT COUNT(*) FROM public.case_votes WHERE case_id = p_case_id AND vote = 1),
    downvotes = (SELECT COUNT(*) FROM public.case_votes WHERE case_id = p_case_id AND vote = -1)
  WHERE id = p_case_id;
  PERFORM set_config('darwin.internal_write', '0', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.sync_comment_vote_counts(p_comment_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('darwin.internal_write', '1', true);
  UPDATE public.case_comments
  SET
    upvotes = (SELECT COUNT(*) FROM public.comment_votes WHERE comment_id = p_comment_id AND vote = 1),
    downvotes = (SELECT COUNT(*) FROM public.comment_votes WHERE comment_id = p_comment_id AND vote = -1)
  WHERE id = p_comment_id;
  PERFORM set_config('darwin.internal_write', '0', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.sync_post_vote_counts(p_post_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('darwin.internal_write', '1', true);
  UPDATE public.forum_posts
  SET
    upvotes = (SELECT COUNT(*) FROM public.post_votes WHERE post_id = p_post_id AND vote = 1),
    downvotes = (SELECT COUNT(*) FROM public.post_votes WHERE post_id = p_post_id AND vote = -1)
  WHERE id = p_post_id;
  PERFORM set_config('darwin.internal_write', '0', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.sync_reply_vote_counts(p_reply_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('darwin.internal_write', '1', true);
  UPDATE public.forum_replies
  SET
    upvotes = (SELECT COUNT(*) FROM public.reply_votes WHERE reply_id = p_reply_id AND vote = 1),
    downvotes = (SELECT COUNT(*) FROM public.reply_votes WHERE reply_id = p_reply_id AND vote = -1)
  WHERE id = p_reply_id;
  PERFORM set_config('darwin.internal_write', '0', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.sync_forum_post_reply_count()
RETURNS TRIGGER AS $$
DECLARE
  v_post_id UUID;
BEGIN
  v_post_id := COALESCE(NEW.post_id, OLD.post_id);
  PERFORM set_config('darwin.internal_write', '1', true);
  UPDATE public.forum_posts
  SET reply_count = (
    SELECT COUNT(*) FROM public.forum_replies r WHERE r.post_id = v_post_id
  )
  WHERE id = v_post_id;
  PERFORM set_config('darwin.internal_write', '0', true);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =========================
-- Guardrails triggers
-- =========================

CREATE OR REPLACE FUNCTION public.trg_guard_shared_cases()
RETURNS TRIGGER AS $$
BEGIN
  -- Allow internal maintenance updates (vote/view sync, etc).
  IF current_setting('darwin.internal_write', true) = '1' THEN
    RETURN NEW;
  END IF;

  -- Immutable ownership.
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'shared_cases.user_id is immutable';
  END IF;

  -- Counters are system-managed.
  IF NEW.upvotes IS DISTINCT FROM OLD.upvotes
     OR NEW.downvotes IS DISTINCT FROM OLD.downvotes
     OR NEW.views IS DISTINCT FROM OLD.views THEN
    RAISE EXCEPTION 'shared_cases counters are read-only';
  END IF;

  -- Verification is moderator-only.
  IF NOT public.is_moderator() THEN
    IF NEW.verified IS DISTINCT FROM OLD.verified
       OR NEW.verified_by IS DISTINCT FROM OLD.verified_by THEN
      RAISE EXCEPTION 'shared_cases verification is moderator-only';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_shared_cases_guardrails ON public.shared_cases;
CREATE TRIGGER on_shared_cases_guardrails
  BEFORE UPDATE ON public.shared_cases
  FOR EACH ROW EXECUTE FUNCTION public.trg_guard_shared_cases();

CREATE OR REPLACE FUNCTION public.trg_guard_case_comments()
RETURNS TRIGGER AS $$
BEGIN
  IF current_setting('darwin.internal_write', true) = '1' THEN
    RETURN NEW;
  END IF;

  -- Immutable relationships.
  IF NEW.case_id IS DISTINCT FROM OLD.case_id THEN
    RAISE EXCEPTION 'case_comments.case_id is immutable';
  END IF;
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'case_comments.user_id is immutable';
  END IF;
  IF NEW.parent_id IS DISTINCT FROM OLD.parent_id THEN
    RAISE EXCEPTION 'case_comments.parent_id is immutable';
  END IF;

  -- Counters are system-managed.
  IF NEW.upvotes IS DISTINCT FROM OLD.upvotes
     OR NEW.downvotes IS DISTINCT FROM OLD.downvotes THEN
    RAISE EXCEPTION 'case_comments counters are read-only';
  END IF;

  -- Verified answer is moderator-only.
  IF NOT public.is_moderator() AND NEW.is_verified_answer IS DISTINCT FROM OLD.is_verified_answer THEN
    RAISE EXCEPTION 'case_comments.is_verified_answer is moderator-only';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_case_comments_guardrails ON public.case_comments;
CREATE TRIGGER on_case_comments_guardrails
  BEFORE UPDATE ON public.case_comments
  FOR EACH ROW EXECUTE FUNCTION public.trg_guard_case_comments();

CREATE OR REPLACE FUNCTION public.trg_guard_forum_posts()
RETURNS TRIGGER AS $$
BEGIN
  IF current_setting('darwin.internal_write', true) = '1' THEN
    RETURN NEW;
  END IF;

  -- Immutable ownership & category.
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'forum_posts.user_id is immutable';
  END IF;
  IF NEW.category_id IS DISTINCT FROM OLD.category_id THEN
    RAISE EXCEPTION 'forum_posts.category_id is immutable';
  END IF;

  -- Counters are system-managed.
  IF NEW.upvotes IS DISTINCT FROM OLD.upvotes
     OR NEW.downvotes IS DISTINCT FROM OLD.downvotes
     OR NEW.view_count IS DISTINCT FROM OLD.view_count
     OR NEW.reply_count IS DISTINCT FROM OLD.reply_count THEN
    RAISE EXCEPTION 'forum_posts counters are read-only';
  END IF;

  -- Pin/lock are moderator-only.
  IF NOT public.is_moderator() THEN
    IF NEW.is_pinned IS DISTINCT FROM OLD.is_pinned
       OR NEW.is_locked IS DISTINCT FROM OLD.is_locked THEN
      RAISE EXCEPTION 'forum_posts pin/lock are moderator-only';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_forum_posts_guardrails ON public.forum_posts;
CREATE TRIGGER on_forum_posts_guardrails
  BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.trg_guard_forum_posts();

CREATE OR REPLACE FUNCTION public.trg_guard_forum_replies()
RETURNS TRIGGER AS $$
BEGIN
  IF current_setting('darwin.internal_write', true) = '1' THEN
    RETURN NEW;
  END IF;

  -- Immutable relationships.
  IF NEW.post_id IS DISTINCT FROM OLD.post_id THEN
    RAISE EXCEPTION 'forum_replies.post_id is immutable';
  END IF;
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'forum_replies.user_id is immutable';
  END IF;
  IF NEW.parent_id IS DISTINCT FROM OLD.parent_id THEN
    RAISE EXCEPTION 'forum_replies.parent_id is immutable';
  END IF;

  -- Counters are system-managed.
  IF NEW.upvotes IS DISTINCT FROM OLD.upvotes
     OR NEW.downvotes IS DISTINCT FROM OLD.downvotes THEN
    RAISE EXCEPTION 'forum_replies counters are read-only';
  END IF;

  -- Accepted answer is moderator-only for now.
  IF NOT public.is_moderator() AND NEW.is_accepted IS DISTINCT FROM OLD.is_accepted THEN
    RAISE EXCEPTION 'forum_replies.is_accepted is moderator-only';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_forum_replies_guardrails ON public.forum_replies;
CREATE TRIGGER on_forum_replies_guardrails
  BEFORE UPDATE ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.trg_guard_forum_replies();

