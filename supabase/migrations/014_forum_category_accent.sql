-- =====================================================
-- DARWIN-MFC - FORUM CATEGORY ACCENT (SEMANTIC TOKENS)
-- =====================================================
-- Migration: 014_forum_category_accent
-- Created: February 2026
-- Description:
--   Add a semantic accent to forum_categories to avoid UI coupling to Tailwind
--   color classes (e.g. 'text-blue-500'). The legacy `color` column remains
--   for backward compatibility, but the UI should prefer `accent`.
-- =====================================================

ALTER TABLE public.forum_categories
  ADD COLUMN IF NOT EXISTS accent TEXT NOT NULL DEFAULT 'info'
  CHECK (accent IN ('primary', 'secondary', 'info', 'safe', 'warning', 'critical'));

COMMENT ON COLUMN public.forum_categories.accent IS
  'Semantic accent token (primary/secondary/info/safe/warning/critical). Prefer over legacy `color`.';

-- Best-effort backfill from legacy `color` strings (idempotent).
UPDATE public.forum_categories
SET accent = CASE
  WHEN color ILIKE '%green%' THEN 'safe'
  WHEN color ILIKE '%amber%' OR color ILIKE '%yellow%' OR color ILIKE '%orange%' THEN 'warning'
  WHEN color ILIKE '%purple%' THEN 'secondary'
  WHEN color ILIKE '%red%' THEN 'critical'
  WHEN color ILIKE '%blue%' OR color ILIKE '%cyan%' OR color ILIKE '%teal%' THEN 'info'
  ELSE 'info'
END
WHERE accent = 'info';

