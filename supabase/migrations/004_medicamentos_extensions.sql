-- =====================================================
-- DARWIN-MFC - MEDICAMENTOS EXTENSIONS
-- =====================================================
-- Migration: 004_medicamentos_extensions
-- Created: February 2026
-- Description: Add PharmGKB and ontology columns to medicamentos
-- =====================================================

-- Add pharmacogenomics and ontology columns
ALTER TABLE public.medicamentos
  ADD COLUMN IF NOT EXISTS pharmgkb JSONB,
  ADD COLUMN IF NOT EXISTS loinc TEXT[],
  ADD COLUMN IF NOT EXISTS rxnorm_cui TEXT,
  ADD COLUMN IF NOT EXISTS drugbank_id TEXT,
  ADD COLUMN IF NOT EXISTS snomed_ct TEXT;

-- Add indexes for ontology lookups
CREATE INDEX IF NOT EXISTS idx_medicamentos_rxnorm ON public.medicamentos(rxnorm_cui) WHERE rxnorm_cui IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_medicamentos_drugbank ON public.medicamentos(drugbank_id) WHERE drugbank_id IS NOT NULL;

-- Add full-text search index for faster medication searches
CREATE INDEX IF NOT EXISTS idx_medicamentos_fts ON public.medicamentos
  USING gin(to_tsvector('portuguese', nome_generico || ' ' || COALESCE(array_to_string(nome_comercial, ' '), '')));

-- =====================================================
-- VERIFICATION
-- =====================================================

DO $$
DECLARE
  col_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO col_count
  FROM information_schema.columns
  WHERE table_schema = 'public'
  AND table_name = 'medicamentos'
  AND column_name IN ('pharmgkb', 'loinc', 'rxnorm_cui', 'drugbank_id', 'snomed_ct');

  IF col_count = 5 THEN
    RAISE NOTICE '✅ All 5 extension columns added to medicamentos';
  ELSE
    RAISE WARNING '⚠️ Only % of 5 extension columns exist', col_count;
  END IF;
END $$;
