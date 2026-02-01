-- =====================================================
-- DARWIN-MFC - MEDICAL CONTENT TABLES
-- =====================================================
-- Migration: 003_medical_content
-- Created: February 2026
-- Description: Tables for medications and diseases
-- This data powers the main medical reference features
-- =====================================================

-- =====================================================
-- MEDICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.medicamentos (
  id TEXT PRIMARY KEY,
  nome_generico TEXT NOT NULL,
  nome_comercial TEXT[],
  classe_terapeutica TEXT NOT NULL,
  subclasse TEXT,
  mecanismo_acao TEXT,
  indicacoes TEXT[],
  contraindicacoes TEXT[],
  efeitos_adversos JSONB, -- {comuns: [], incomuns: [], raros: [], graves: []}
  interacoes JSONB, -- [{medicamento, gravidade, efeito}]
  posologia JSONB, -- {adulto: {dose, via, frequencia}, pediatrico: {...}}
  farmacocinetica JSONB, -- {absorcao, distribuicao, metabolismo, excrecao, meia_vida}
  apresentacoes TEXT[],
  disponivel_sus BOOLEAN DEFAULT false,
  disponivel_farmacia_popular BOOLEAN DEFAULT false,
  atc_code TEXT,
  cid10_indicacoes TEXT[],
  ciap2_indicacoes TEXT[],
  gestacao TEXT, -- categoria de risco
  lactacao TEXT,
  insuficiencia_renal TEXT,
  insuficiencia_hepatica TEXT,
  idoso TEXT,
  pediatrico TEXT,
  monitoramento TEXT[],
  ajuste_dose JSONB,
  regional_overlays JSONB, -- BR/IN/EU specific data
  referencias JSONB, -- citations
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Full-text search index for medications
CREATE INDEX IF NOT EXISTS idx_medicamentos_nome ON public.medicamentos USING GIN (to_tsvector('portuguese', nome_generico || ' ' || COALESCE(array_to_string(nome_comercial, ' '), '')));
CREATE INDEX IF NOT EXISTS idx_medicamentos_classe ON public.medicamentos(classe_terapeutica);
CREATE INDEX IF NOT EXISTS idx_medicamentos_sus ON public.medicamentos(disponivel_sus) WHERE disponivel_sus = true;
CREATE INDEX IF NOT EXISTS idx_medicamentos_atc ON public.medicamentos(atc_code);

-- =====================================================
-- DISEASES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.doencas (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  nome_alternativo TEXT[],
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  descricao TEXT,
  epidemiologia JSONB, -- {prevalencia, incidencia, faixa_etaria, fatores_risco}
  fisiopatologia TEXT,
  quadro_clinico JSONB, -- {sintomas: [], sinais: [], apresentacao_tipica}
  diagnostico JSONB, -- {clinico, laboratorial, imagem, diferencial}
  tratamento JSONB, -- {farmacologico: [], nao_farmacologico: [], cirurgico}
  prognostico TEXT,
  prevencao TEXT[],
  complicacoes TEXT[],
  quando_encaminhar TEXT[],
  cid10 TEXT NOT NULL,
  ciap2 TEXT,
  criterios_diagnosticos JSONB,
  medicamentos_relacionados TEXT[], -- references medicamentos.id
  protocolos_relacionados TEXT[], -- references protocolos.id
  regional_overlays JSONB, -- BR/IN/EU specific data
  referencias JSONB, -- citations
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Full-text search index for diseases
CREATE INDEX IF NOT EXISTS idx_doencas_nome ON public.doencas USING GIN (to_tsvector('portuguese', nome || ' ' || COALESCE(array_to_string(nome_alternativo, ' '), '')));
CREATE INDEX IF NOT EXISTS idx_doencas_categoria ON public.doencas(categoria);
CREATE INDEX IF NOT EXISTS idx_doencas_cid10 ON public.doencas(cid10);
CREATE INDEX IF NOT EXISTS idx_doencas_ciap2 ON public.doencas(ciap2);

-- =====================================================
-- PROTOCOLS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.protocolos (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT,
  condicoes TEXT[], -- disease IDs this protocol applies to
  fluxograma JSONB, -- flowchart data {nodes: [], edges: []}
  etapas JSONB, -- step-by-step protocol
  criterios_inclusao TEXT[],
  criterios_exclusao TEXT[],
  medicamentos TEXT[], -- related medication IDs
  exames TEXT[], -- required tests
  monitoramento JSONB,
  fonte TEXT, -- source: SUS, sociedade, etc.
  ano_publicacao INTEGER,
  referencias JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_protocolos_categoria ON public.protocolos(categoria);
CREATE INDEX IF NOT EXISTS idx_protocolos_titulo ON public.protocolos USING GIN (to_tsvector('portuguese', titulo));

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Medical content is public (read-only for everyone)
ALTER TABLE public.medicamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doencas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocolos ENABLE ROW LEVEL SECURITY;

-- Anyone can read medical content
CREATE POLICY "Public read access for medicamentos" ON public.medicamentos FOR SELECT USING (true);
CREATE POLICY "Public read access for doencas" ON public.doencas FOR SELECT USING (true);
CREATE POLICY "Public read access for protocolos" ON public.protocolos FOR SELECT USING (true);

-- Only service role can insert/update (for data imports)
CREATE POLICY "Service role can manage medicamentos" ON public.medicamentos FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage doencas" ON public.doencas FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role can manage protocolos" ON public.protocolos FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- UPDATE TRIGGERS
-- =====================================================

CREATE TRIGGER on_medicamentos_updated BEFORE UPDATE ON public.medicamentos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_doencas_updated BEFORE UPDATE ON public.doencas FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER on_protocolos_updated BEFORE UPDATE ON public.protocolos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- VERIFICATION
-- =====================================================

DO $$
DECLARE
  table_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_name IN ('medicamentos', 'doencas', 'protocolos');

  IF table_count = 3 THEN
    RAISE NOTICE '✅ All 3 medical content tables created successfully';
  ELSE
    RAISE WARNING '⚠️ Only % of 3 tables created', table_count;
  END IF;
END $$;
