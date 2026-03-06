-- =====================================================
-- DARWIN-MFC - FORUM NOTIFICATIONS (MVP)
-- =====================================================
-- Migration: 016_forum_notifications
-- Created: February 2026
-- Description:
--   Create notifications when forum replies are posted:
--   - Notify post owner when someone replies to their post
--   - Notify parent reply owner when someone replies to their reply
-- =====================================================

CREATE OR REPLACE FUNCTION public.notify_on_forum_reply()
RETURNS TRIGGER AS $$
DECLARE
  v_post_owner UUID;
  v_parent_owner UUID;
BEGIN
  -- Notify post owner (if someone else replied)
  SELECT user_id INTO v_post_owner FROM public.forum_posts WHERE id = NEW.post_id;
  IF v_post_owner IS NOT NULL AND v_post_owner <> NEW.user_id THEN
    INSERT INTO public.notifications (user_id, type, payload)
    VALUES (
      v_post_owner,
      'forum_reply',
      jsonb_build_object('post_id', NEW.post_id, 'reply_id', NEW.id)
    );
  END IF;

  -- Notify parent reply owner (if nested reply)
  IF NEW.parent_id IS NOT NULL THEN
    SELECT user_id INTO v_parent_owner FROM public.forum_replies WHERE id = NEW.parent_id;
    IF v_parent_owner IS NOT NULL AND v_parent_owner <> NEW.user_id THEN
      INSERT INTO public.notifications (user_id, type, payload)
      VALUES (
        v_parent_owner,
        'forum_reply_reply',
        jsonb_build_object('post_id', NEW.post_id, 'reply_id', NEW.id, 'parent_id', NEW.parent_id)
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_forum_reply_notify ON public.forum_replies;
CREATE TRIGGER on_forum_reply_notify
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_forum_reply();

