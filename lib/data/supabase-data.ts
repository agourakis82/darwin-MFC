/**
 * Supabase Data Layer
 * ====================
 *
 * Fetches medical data from Supabase when configured,
 * falls back to static TypeScript data when not.
 *
 * This enables:
 * - Small bundle size (no static data included)
 * - Fast builds (no SSG for thousands of pages)
 * - Easy data updates (no rebuild needed)
 */

import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';
import type { Medicamento, ClasseTerapeutica, SubclasseMedicamento, ClassificacaoGestacao } from '@/lib/types/medicamento';
import type { Doenca, CategoriaDoenca } from '@/lib/types/doenca';

// Cache for static fallback data (lazy loaded)
let staticMedicamentos: Medicamento[] | null = null;
let staticDoencas: Doenca[] | null = null;

/**
 * Get all medications
 * Uses Supabase if configured, otherwise falls back to static data
 */
export async function getMedicamentos(): Promise<Medicamento[]> {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .order('nome_generico');

      if (!error && data) {
        return data.map(transformDbMedicamento);
      }
      console.error('Supabase fetch failed, falling back to static:', error?.message);
    }
  }

  // Fallback to static data
  if (!staticMedicamentos) {
    const { medicamentosConsolidados } = await import('@/lib/data/medicamentos/index');
    staticMedicamentos = medicamentosConsolidados;
  }
  return staticMedicamentos;
}

/**
 * Get medication by ID
 */
export async function getMedicamentoById(id: string): Promise<Medicamento | null> {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return transformDbMedicamento(data);
      }
      if (error?.code !== 'PGRST116') { // Not "no rows returned"
        console.error('Supabase fetch failed:', error?.message);
      }
    }
  }

  // Fallback to static data
  const meds = await getMedicamentos();
  return meds.find(m => m.id === id) || null;
}

/**
 * Get all diseases
 */
export async function getDoencas(): Promise<Doenca[]> {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('doencas')
        .select('*')
        .order('titulo');

      if (!error && data) {
        return data.map(transformDbDoenca);
      }
      console.error('Supabase fetch failed, falling back to static:', error?.message);
    }
  }

  // Fallback to static data
  if (!staticDoencas) {
    const { doencasConsolidadas } = await import('@/lib/data/doencas/index');
    // Cast as Doenca[] - the static data has all required fields at runtime
    staticDoencas = doencasConsolidadas as Doenca[];
  }
  return staticDoencas!
}

/**
 * Get disease by ID
 */
export async function getDoencaById(id: string): Promise<Doenca | null> {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('doencas')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        return transformDbDoenca(data);
      }
      if (error?.code !== 'PGRST116') {
        console.error('Supabase fetch failed:', error?.message);
      }
    }
  }

  // Fallback to static data
  const diseases = await getDoencas();
  return diseases.find(d => d.id === id) || null;
}

/**
 * Search medications
 */
export async function searchMedicamentos(query: string): Promise<Medicamento[]> {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .or(`nome_generico.ilike.%${query}%,nome_comercial.cs.{${query}}`)
        .order('nome_generico')
        .limit(50);

      if (!error && data) {
        return data.map(transformDbMedicamento);
      }
    }
  }

  // Fallback: simple filter on static data
  const meds = await getMedicamentos();
  const lowerQuery = query.toLowerCase();
  return meds.filter(m =>
    m.nomeGenerico.toLowerCase().includes(lowerQuery) ||
    m.nomesComerciais?.some(n => n.toLowerCase().includes(lowerQuery))
  ).slice(0, 50);
}

/**
 * Search diseases
 */
export async function searchDoencas(query: string): Promise<Doenca[]> {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('doencas')
        .select('*')
        .or(`titulo.ilike.%${query}%,cid10.cs.{${query}}`)
        .order('titulo')
        .limit(50);

      if (!error && data) {
        return data.map(transformDbDoenca);
      }
    }
  }

  // Fallback
  const diseases = await getDoencas();
  const lowerQuery = query.toLowerCase();
  return diseases.filter(d =>
    d.titulo.toLowerCase().includes(lowerQuery) ||
    d.cid10.some(code => code.toLowerCase().includes(lowerQuery))
  ).slice(0, 50);
}

/**
 * Get medications by class
 */
export async function getMedicamentosByClasse(classe: string): Promise<Medicamento[]> {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .eq('classe_terapeutica', classe)
        .order('nome_generico');

      if (!error && data) {
        return data.map(transformDbMedicamento);
      }
    }
  }

  const meds = await getMedicamentos();
  return meds.filter(m => m.classeTerapeutica === classe);
}

/**
 * Get diseases by category
 */
export async function getDoencasByCategoria(categoria: string): Promise<Doenca[]> {
  if (isSupabaseConfigured) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('doencas')
        .select('*')
        .eq('categoria', categoria)
        .order('titulo');

      if (!error && data) {
        return data.map(transformDbDoenca);
      }
    }
  }

  const diseases = await getDoencas();
  return diseases.filter(d => d.categoria === categoria);
}

// ============================================================================
// TRANSFORMERS - Convert DB format to TypeScript types
// ============================================================================

/**
 * Transform database medication record to Medicamento type.
 * Database stores complex nested objects as JSONB.
 */
function transformDbMedicamento(db: Record<string, unknown>): Medicamento {
  // Parse JSONB fields that are stored as complex objects
  const efeitosAdversos = db.efeitos_adversos as { comuns: string[]; graves?: string[] } | null;
  const interacoes = db.interacoes as Medicamento['interacoes'] | null;
  const posologias = db.posologias as Medicamento['posologias'] | null;
  const apresentacoes = db.apresentacoes as Medicamento['apresentacoes'] | null;
  const ajusteDoseRenal = db.ajuste_dose_renal as Medicamento['ajusteDoseRenal'] | null;
  const amamentacao = db.amamentacao as Medicamento['amamentacao'] | null;
  const consideracoesEspeciais = db.consideracoes_especiais as Medicamento['consideracoesEspeciais'] | null;
  const citations = db.referencias as Medicamento['citations'] | null;
  const regionalOverlays = db.regional_overlays as Medicamento['regionalOverlays'] | null;

  return {
    id: db.id as string,
    nomeGenerico: db.nome_generico as string,
    nomesComerciais: (db.nomes_comerciais as string[]) || undefined,
    atcCode: db.atc_code as string | undefined,
    rxNormCui: db.rxnorm_cui as string | undefined,
    drugBankId: db.drugbank_id as string | undefined,
    snomedCT: db.snomed_ct as string | undefined,
    anvisaRegistro: db.anvisa_registro as string | undefined,
    dcbCode: db.dcb_code as string | undefined,
    classeTerapeutica: db.classe_terapeutica as ClasseTerapeutica,
    subclasse: db.subclasse as SubclasseMedicamento | undefined,
    rename: (db.rename as boolean) ?? false,
    apresentacoes: apresentacoes || [],
    indicacoes: (db.indicacoes as string[]) || [],
    mecanismoAcao: (db.mecanismo_acao as string) || '',
    posologias: posologias || [],
    contraindicacoes: (db.contraindicacoes as string[]) || [],
    precaucoes: (db.precaucoes as string[]) || undefined,
    efeitosAdversos: efeitosAdversos || { comuns: [] },
    interacoes: interacoes || [],
    ajusteDoseRenal: ajusteDoseRenal || undefined,
    gestacao: (db.gestacao as ClassificacaoGestacao) || 'N',
    amamentacao: amamentacao || { compativel: false, observacao: 'Sem dados' },
    consideracoesEspeciais: consideracoesEspeciais || undefined,
    monitorizacao: (db.monitorizacao as string[]) || undefined,
    orientacoesPaciente: (db.orientacoes_paciente as string[]) || undefined,
    doencasRelacionadas: (db.doencas_relacionadas as string[]) || [],
    calculadoras: (db.calculadoras as string[]) || undefined,
    citations: citations || [],
    lastUpdate: (db.updated_at as string) || (db.last_update as string) || new Date().toISOString(),
    tags: (db.tags as string[]) || undefined,
    regionalOverlays: regionalOverlays || undefined,
  };
}

/**
 * Transform database disease record to Doenca type.
 * Database stores complex nested objects as JSONB.
 */
function transformDbDoenca(db: Record<string, unknown>): Doenca {
  // Parse JSONB fields
  const quickView = db.quick_view as Doenca['quickView'] | null;
  const fullContent = db.full_content as Doenca['fullContent'] | null;
  const citations = db.referencias as Doenca['citations'] | null;
  const regionalOverlays = db.regional_overlays as Doenca['regionalOverlays'] | null;

  // Default quickView if not in DB
  const defaultQuickView: Doenca['quickView'] = {
    definicao: (db.descricao as string) || '',
    criteriosDiagnosticos: [],
    tratamentoPrimeiraLinha: { naoFarmacologico: [], farmacologico: [] },
    redFlags: [],
  };

  // Default fullContent if not in DB
  const defaultFullContent: Doenca['fullContent'] = {
    epidemiologia: { fatoresRisco: [], citations: [] },
    quadroClinico: { sintomasPrincipais: [], sinaisExameFisico: [], citations: [] },
    diagnostico: { criterios: [], diagnosticoDiferencial: [], citations: [] },
    tratamento: {
      objetivos: [],
      naoFarmacologico: { medidas: [], citations: [] },
      farmacologico: { primeiraLinha: [], citations: [] },
    },
    acompanhamento: { frequenciaConsultas: '', metasTerapeuticas: [], criteriosEncaminhamento: [], citations: [] },
  };

  return {
    id: db.id as string,
    titulo: (db.titulo as string) || (db.nome as string) || '',
    sinonimos: (db.sinonimos as string[]) || (db.nome_alternativo as string[]) || undefined,
    doid: db.doid as string | undefined,
    snomedCT: db.snomed_ct as string | undefined,
    meshId: db.mesh_id as string | undefined,
    umlsCui: db.umls_cui as string | undefined,
    ciap2: Array.isArray(db.ciap2) ? db.ciap2 as string[] : (db.ciap2 ? [db.ciap2 as string] : []),
    cid10: Array.isArray(db.cid10) ? db.cid10 as string[] : (db.cid10 ? [db.cid10 as string] : []),
    cid11: (db.cid11 as string[]) || undefined,
    hpo: (db.hpo as string[]) || undefined,
    loinc: (db.loinc as Doenca['loinc']) || undefined,
    ordo: (db.ordo as string[]) || undefined,
    categoria: db.categoria as CategoriaDoenca,
    subcategoria: db.subcategoria as string | undefined,
    quickView: quickView || defaultQuickView,
    fullContent: fullContent || defaultFullContent,
    protocolos: (db.protocolos as string[]) || (db.protocolos_relacionados as string[]) || [],
    medicamentos: (db.medicamentos as string[]) || (db.medicamentos_relacionados as string[]) || [],
    calculadoras: (db.calculadoras as string[]) || [],
    rastreamentos: (db.rastreamentos as string[]) || undefined,
    citations: citations || [],
    lastUpdate: (db.updated_at as string) || (db.last_update as string) || new Date().toISOString(),
    tags: (db.tags as string[]) || undefined,
    regionalOverlays: regionalOverlays || undefined,
  };
}
