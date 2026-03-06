-- =====================================================
-- DARWIN-MFC - VIEW COUNTERS (RPC)
-- =====================================================
-- Migration: 015_view_counters
-- Created: February 2026
-- Description:
--   Guardrails (013_guardrails_internal_counters.sql) prevent clients from
--   directly mutating materialized counters. These RPCs increment view counts
--   using SECURITY DEFINER + internal_write flag so the triggers allow it.
-- =====================================================

-- =========================
-- Cases: increment views
-- =========================

CREATE OR REPLACE FUNCTION public.increment_case_view(p_case_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('darwin.internal_write', '1', true);
  UPDATE public.shared_cases
  SET views = views + 1
  WHERE id = p_case_id;
  PERFORM set_config('darwin.internal_write', '0', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.increment_case_view(UUID) TO anon, authenticated;

-- =========================
-- Forum: increment view_count
-- =========================

CREATE OR REPLACE FUNCTION public.increment_post_view(p_post_id UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('darwin.internal_write', '1', true);
  UPDATE public.forum_posts
  SET view_count = view_count + 1
  WHERE id = p_post_id;
  PERFORM set_config('darwin.internal_write', '0', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.increment_post_view(UUID) TO anon, authenticated;

