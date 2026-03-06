-- =====================================================
-- DARWIN-MFC - ENABLE PGCRYPTO
-- =====================================================
-- Migration: 006_enable_pgcrypto
-- Created: February 2026
-- Description: Ensure gen_random_uuid() is available (used by 002_full_schema.sql)
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

