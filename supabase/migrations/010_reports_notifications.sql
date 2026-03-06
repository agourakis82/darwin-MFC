-- =====================================================
-- DARWIN-MFC - REPORTS + NOTIFICATIONS (MVP)
-- =====================================================
-- Migration: 010_reports_notifications
-- Created: February 2026
-- Description: Content reports for moderation + user notifications
-- =====================================================

-- =========================
-- Content reports
-- =========================

CREATE TABLE IF NOT EXISTS public.content_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('shared_case', 'case_comment', 'forum_post', 'forum_reply')),
  entity_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'reviewing', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can file a report. For authenticated users, reporter_user_id must match auth.uid().
CREATE POLICY "Anyone can file reports" ON public.content_reports
  FOR INSERT
  WITH CHECK (reporter_user_id IS NULL OR reporter_user_id = auth.uid());

-- Reporter can view own reports; moderators/admins can view all.
CREATE POLICY "Users can view own reports" ON public.content_reports
  FOR SELECT
  USING (reporter_user_id = auth.uid());

CREATE POLICY "Moderators can view all reports" ON public.content_reports
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "Moderators can manage reports" ON public.content_reports
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
    )
  );

CREATE TRIGGER on_content_reports_updated
  BEFORE UPDATE ON public.content_reports
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_reports_status ON public.content_reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_entity ON public.content_reports(entity_type, entity_id);

-- =========================
-- Notifications (MVP)
-- =========================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::JSONB,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- System insert happens via SECURITY DEFINER trigger function (table owner bypasses RLS by default)

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id) WHERE read_at IS NULL;

-- =========================
-- Trigger: notify on case comments
-- =========================

CREATE OR REPLACE FUNCTION public.notify_on_case_comment()
RETURNS TRIGGER AS $$
DECLARE
  v_case_owner UUID;
  v_parent_owner UUID;
BEGIN
  -- Notify case owner (if someone else commented)
  SELECT user_id INTO v_case_owner FROM public.shared_cases WHERE id = NEW.case_id;
  IF v_case_owner IS NOT NULL AND v_case_owner <> NEW.user_id THEN
    INSERT INTO public.notifications (user_id, type, payload)
    VALUES (
      v_case_owner,
      'case_comment',
      jsonb_build_object('case_id', NEW.case_id, 'comment_id', NEW.id)
    );
  END IF;

  -- Notify parent comment owner (if reply)
  IF NEW.parent_id IS NOT NULL THEN
    SELECT user_id INTO v_parent_owner FROM public.case_comments WHERE id = NEW.parent_id;
    IF v_parent_owner IS NOT NULL AND v_parent_owner <> NEW.user_id THEN
      INSERT INTO public.notifications (user_id, type, payload)
      VALUES (
        v_parent_owner,
        'comment_reply',
        jsonb_build_object('case_id', NEW.case_id, 'comment_id', NEW.id, 'parent_id', NEW.parent_id)
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_case_comment_notify ON public.case_comments;
CREATE TRIGGER on_case_comment_notify
  AFTER INSERT ON public.case_comments
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_case_comment();

