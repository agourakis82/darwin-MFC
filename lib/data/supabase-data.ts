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
import type { Medicamento } from '@/lib/types/medicamento';
import type { Doenca } from '@/lib/types/doenca';
import { convertMedicamentoRowToMedicamento } from '@/lib/supabase/transforms/medicamentos';
import { convertDoencaRowToDoenca } from '@/lib/supabase/transforms/doencas';

// Cache for static fallback data (lazy loaded)
let staticMedicamentos: Medicamento[] | null = null;
let staticDoencas: Doenca[] | null = null;

const allowSupabaseDuringBuild = process.env.DARWIN_ALLOW_SUPABASE_DURING_BUILD === '1';
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
const canUseSupabase = isSupabaseConfigured && (!isBuildPhase || allowSupabaseDuringBuild);

let supabaseMedicamentosOk: boolean | undefined;
let supabaseDoencasOk: boolean | undefined;

const loggedFallbacks = new Set<string>();
function logFallbackOnce(scope: string, message?: string) {
  // Keep production builds clean and deterministic.
  if (process.env.NODE_ENV === 'production') return;
  if (loggedFallbacks.has(scope)) return;
  loggedFallbacks.add(scope);
  console.warn(`[supabase-data] ${scope}: ${message ?? 'using static fallback'}`);
}

/**
 * Get all medications
 * Uses Supabase if configured, otherwise falls back to static data
 */
export async function getMedicamentos(): Promise<Medicamento[]> {
  if (canUseSupabase && supabaseMedicamentosOk !== false) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .order('nome_generico');

      if (!error && data) {
        supabaseMedicamentosOk = true;
        return data.map(convertMedicamentoRowToMedicamento);
      }
      supabaseMedicamentosOk = false;
      logFallbackOnce('medicamentos', error?.message);
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
  if (canUseSupabase && supabaseMedicamentosOk !== false) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        supabaseMedicamentosOk = true;
        return convertMedicamentoRowToMedicamento(data);
      }
      if (error?.code !== 'PGRST116') { // Not "no rows returned"
        supabaseMedicamentosOk = false;
        logFallbackOnce('medicamentos', error?.message);
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
  if (canUseSupabase && supabaseDoencasOk !== false) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('doencas')
        .select('*')
        .order('nome');

      if (!error && data) {
        supabaseDoencasOk = true;
        return data.map(convertDoencaRowToDoenca);
      }
      supabaseDoencasOk = false;
      logFallbackOnce('doencas', error?.message);
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
  if (canUseSupabase && supabaseDoencasOk !== false) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('doencas')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        supabaseDoencasOk = true;
        return convertDoencaRowToDoenca(data);
      }
      if (error?.code !== 'PGRST116') {
        supabaseDoencasOk = false;
        logFallbackOnce('doencas', error?.message);
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
  if (canUseSupabase && supabaseMedicamentosOk !== false) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .or(`nome_generico.ilike.%${query}%,nome_comercial.cs.{${query}}`)
        .order('nome_generico')
        .limit(50);

      if (!error && data) {
        supabaseMedicamentosOk = true;
        return data.map(convertMedicamentoRowToMedicamento);
      }
      supabaseMedicamentosOk = false;
      logFallbackOnce('medicamentos.search', error?.message);
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
  if (canUseSupabase && supabaseDoencasOk !== false) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('doencas')
        .select('*')
        .or(`nome.ilike.%${query}%,cid10.ilike.%${query}%,ciap2.ilike.%${query}%`)
        .order('nome')
        .limit(50);

      if (!error && data) {
        supabaseDoencasOk = true;
        return data.map(convertDoencaRowToDoenca);
      }
      supabaseDoencasOk = false;
      logFallbackOnce('doencas.search', error?.message);
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
  if (canUseSupabase && supabaseMedicamentosOk !== false) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('medicamentos')
        .select('*')
        .eq('classe_terapeutica', classe)
        .order('nome_generico');

      if (!error && data) {
        supabaseMedicamentosOk = true;
        return data.map(convertMedicamentoRowToMedicamento);
      }
      supabaseMedicamentosOk = false;
      logFallbackOnce('medicamentos.byClasse', error?.message);
    }
  }

  const meds = await getMedicamentos();
  return meds.filter(m => m.classeTerapeutica === classe);
}

/**
 * Get diseases by category
 */
export async function getDoencasByCategoria(categoria: string): Promise<Doenca[]> {
  if (canUseSupabase && supabaseDoencasOk !== false) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('doencas')
        .select('*')
        .eq('categoria', categoria)
        .order('nome');

      if (!error && data) {
        supabaseDoencasOk = true;
        return data.map(convertDoencaRowToDoenca);
      }
      supabaseDoencasOk = false;
      logFallbackOnce('doencas.byCategoria', error?.message);
    }
  }

  const diseases = await getDoencas();
  return diseases.filter(d => d.categoria === categoria);
}
