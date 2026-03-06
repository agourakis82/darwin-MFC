-- =====================================================
-- DARWIN-MFC - DEPRECATE LEGACY PROFILES TABLE
-- =====================================================
-- Migration: 007_deprecate_profiles
-- Created: February 2026
-- Description: Removes legacy public.profiles introduced in 001_initial_schema.sql
--              The canonical user tables are public.users + public.user_preferences + public.user_xp
-- =====================================================

-- Drop legacy triggers/policies/indexes if present
DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

DROP INDEX IF EXISTS public.idx_profiles_email;
DROP INDEX IF EXISTS public.idx_profiles_last_activity;
DROP INDEX IF EXISTS public.idx_profiles_xp;

-- Finally drop table (safe if already dropped)
DROP TABLE IF EXISTS public.profiles;

