-- =====================================================
-- DARWIN-MFC - MODERATION POLICIES
-- =====================================================
-- Migration: 012_moderation_policies
-- Created: February 2026
-- Description: Allow moderator/admin roles to manage community content
-- =====================================================

-- Shared cases: moderators/admins can update verification/publication fields
CREATE POLICY "Moderators can update shared cases"
  ON public.shared_cases
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
    )
  );

-- Shared cases: moderators/admins can delete abusive content
CREATE POLICY "Moderators can delete shared cases"
  ON public.shared_cases
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
    )
  );

-- Case comments: moderators/admins can update (e.g., hide/mark verified answer)
CREATE POLICY "Moderators can update case comments"
  ON public.case_comments
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
    )
  );

-- Case comments: moderators/admins can delete
CREATE POLICY "Moderators can delete case comments"
  ON public.case_comments
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
    )
  );

-- Forum: moderators/admins can manage all posts/replies
CREATE POLICY "Moderators can manage forum posts"
  ON public.forum_posts
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "Moderators can manage forum replies"
  ON public.forum_replies
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role IN ('moderator', 'admin')
    )
  );

