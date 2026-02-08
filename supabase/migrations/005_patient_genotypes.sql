-- ============================================================================
-- MIGRATION 005: Patient Genotypes Table
-- ============================================================================
-- Stores user pharmacogenomic genotype selections for personalized drug alerts.
-- Each user can store one diplotype per gene. RLS ensures data isolation.
-- ============================================================================

CREATE TABLE IF NOT EXISTS patient_genotypes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  gene TEXT NOT NULL,
  diplotype TEXT NOT NULL,
  source TEXT DEFAULT 'self_reported',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, gene)
);

-- Row Level Security
ALTER TABLE patient_genotypes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own genotypes"
  ON patient_genotypes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_patient_genotypes_user_id
  ON patient_genotypes(user_id);
